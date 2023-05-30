import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
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
  @UseGuards(TokenAuthGuard)
  async getAll(@CurrentUser() user: User): Promise<Trip[]> {
    const userId = user.id;
    return this.tripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.tourist', 'tourist')
      .select(['trip', 'tourist.id', 'tourist.firstName', 'tourist.lastName'])
      .where('tourist = :userId', { userId })
      .getMany();
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
}
