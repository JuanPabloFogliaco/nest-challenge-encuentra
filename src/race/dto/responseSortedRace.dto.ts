import {
  IsString,
  IsDate,
  IsInt,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RaceResultDto {
  @IsInt()
  position: number;

  @IsInt()
  driver_id: number;

  @IsInt()
  laps: number;

  @IsString()
  time: string;

  @ValidateNested()
  @Type(() => DriverDto)
  driver: DriverDto;
}

export class RaceDto {
  @IsString()
  id: string;

  @IsDate()
  date: Date;

  @IsInt()
  laps: number;
}

export class DriverDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  team: string;

  @IsString()
  country: string;
}

export class RaceResponseDto_V2 {
  @ValidateNested()
  @Type(() => RaceDto)
  race: RaceDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RaceResultDto)
  results: RaceResultDto[];
}
