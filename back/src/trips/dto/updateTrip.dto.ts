import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateTripDto {
  @IsNotEmpty()
  itinerary: string;

  @IsNotEmpty()
  @IsDateString()
  startsAt: Date;

  @IsNotEmpty()
  @IsDateString()
  finishesAt: Date;
}
