import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
