import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from '../entities/trip.entity';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/createTrip.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { CurrentUser } from '../auth/currentUser.decorator';
import { User } from '../entities/user.entity';

@Controller('trips')
export class TripsController {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  @Post()
  @UseGuards(TokenAuthGuard)
  async createTrip(@CurrentUser() user: User, @Body() body: CreateTripDto) {
    const trip = this.tripRepository.create({
      tourist: user,
      itinerary: body.itinerary,
      startsAt: body.startsAt,
      finishesAt: body.finishesAt,
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
}
