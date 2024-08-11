import { Module } from '@nestjs/common';
import { RaceModule } from './race/race.module';

@Module({
  imports: [RaceModule],
})
export class AppModule {}
