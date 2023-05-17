import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateTripDto {
  // @IsNotEmpty()
  // tourist: number;

  @IsNotEmpty()
  itinerary: string;

  @IsNotEmpty()
  @IsDateString()
  startsAt: Date;

  @IsNotEmpty()
  @IsDateString()
  finishesAt: Date;
}
