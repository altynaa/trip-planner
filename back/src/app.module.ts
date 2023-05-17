import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { User } from './entities/user.entity';
import { UsersController } from './users/users.controller';
import { Trip } from './entities/trip.entity';
import { TripsController } from './trips/trips.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([User, Trip]),
    PassportModule,
  ],
  controllers: [AppController, UsersController, TripsController],
  providers: [AppService, AuthService, LocalStrategy],
})
export class AppModule {}
