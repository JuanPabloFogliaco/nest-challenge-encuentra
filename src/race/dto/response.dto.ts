import {
  IsString,
  IsDate,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RaceResultDto {
  @IsInt()
  position: number;

  @IsInt()
  driver_id: number;

  @IsInt()
  laps: number;

  @IsString()
  time: string;
}

class RaceDto {
  @IsString()
  id: string;

  @IsDate()
  date: Date;

  @IsInt()
  laps: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RaceResultDto)
  results: RaceResultDto[];
}

class DriverDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  team: string;

  @IsString()
  country: string;
}

export class RaceResponse_V1Dto {
  @ValidateNested()
  @Type(() => RaceDto)
  race: RaceDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DriverDto)
  drivers: DriverDto[];
}
