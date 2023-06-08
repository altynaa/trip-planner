import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from '../entities/trip.entity';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/createTrip.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { CurrentUser } from '../auth/currentUser.decorator';
import { User } from '../entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTripDto } from './dto/updateTrip.dto';

@Controller('trips')
export class TripsController {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  @Post()
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(
    FileInterceptor('flightBooking', { dest: './public/uploads/trip/file' }),
  )
  async createTrip(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
    @Body() body: CreateTripDto,
  ) {
    const trip = this.tripRepository.create({
      tourist: user,
      itinerary: body.itinerary,
      startsAt: body.startsAt,
      finishesAt: body.finishesAt,
      flightBooking: file ? '/uploads/trip/file/' + file.filename : null,
    });
    return this.tripRepository.save(trip);
  }

  @Get()
  // @UseGuards(TokenAuthGuard)
  async getAll(@CurrentUser() user: User) {
    const userId = user.id;
    const trips = await this.tripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.tourist', 'tourist')
      .select(['trip', 'tourist.id', 'tourist.firstName', 'tourist.lastName'])
      .where('tourist = :userId', { userId })
      .getMany();

    return trips.map((trip) => ({
      ...trip,
      itinerary: Array.from(JSON.parse(trip.itinerary)),
      flightBooking: trip.flightBooking
        ? `http://localhost:8000${trip.flightBooking}`
        : null,
    }));
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard)
  async updateTrip(@Param('id') id: number, @Body() body: UpdateTripDto) {
    const trip = await this.tripRepository.findOne({
      where: { id: id },
    });
    if (trip) {
      trip.itinerary = body.itinerary;
      trip.startsAt = body.startsAt;
      trip.finishesAt = body.finishesAt;
      return this.tripRepository.save(trip);
    } else {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard)
  async removeTrip(@Param('id') id: number) {
    const trip: Trip = await this.tripRepository.findOne({
      where: { id },
    });

    if (trip) {
      return this.tripRepository.delete(id);
    } else {
      throw new NotFoundException(`Trip with id ${id} not found`);
    }
  }

  @Get(':id')
  @UseGuards(TokenAuthGuard)
  async getOneTrip(@Param('id') id: number) {
    return this.tripRepository.findOne({
      where: { id: id },
    });
  }
}
