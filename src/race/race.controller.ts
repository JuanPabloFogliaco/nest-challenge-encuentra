import { Controller, Get } from '@nestjs/common';
import { RaceService } from './race.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Race')
@Controller('/race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Get('/')
  getRaces(): Promise<any> {
    return this.raceService.getRaces();
  }

  @Get('/sorted')
  getSortedRaces(): Promise<any> {
    return this.raceService.getSortedRaces();
  }
}
