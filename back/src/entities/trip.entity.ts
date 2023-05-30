import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'tourist' })
  tourist: User;

  @Column()
  itinerary: string;

  @Column()
  startsAt: Date;

  @Column()
  finishesAt: Date;

  @Column({ nullable: true })
  flightBooking: string | null;
}
