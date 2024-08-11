import { Injectable, Logger } from '@nestjs/common';
import {
  RaceResponseDto_V2,
  DriverDto,
  RaceResultDto,
  RaceDto,
} from './dto/responseSortedRace.dto';
import { RaceResponse_V1Dto } from './dto/response.dto';

@Injectable()
export class RaceService {
  private readonly logger = new Logger(RaceService.name);

  //getRaces: Obtengo la lista tal cual viene desde el servicio, results y drivers.
  async getRaces(): Promise<RaceResponse_V1Dto> {
    try {
      const response = await fetch('https://pastebin.com/raw/zCrY8y8R');
      return response.json();
    } catch (error) {
      this.logger.error('Error fetching or formatting race data', error.stack);
      throw new Error('Error fetching or formatting race data');
    }
  }

  //getSortedRaces: Obtengo la lista tal cual viene desde el servicio, results y drivers para luego filtrarla y ordenarla por posiciones, con su nombre de piloto, equipo y tiempo.
  async getSortedRaces(): Promise<RaceResponseDto_V2> {
    try {
      const response = await fetch('https://pastebin.com/raw/zCrY8y8R');
      const racesData = await response.json();

      if (!racesData || !racesData.race || !racesData.drivers) {
        throw new Error('Invalid data structure');
      }

      // Map de drivers por ID
      const driversMap = new Map<number, DriverDto>();
      racesData.drivers.forEach((driver: DriverDto) =>
        driversMap.set(driver.id, driver),
      );

      // Ordenar resultados por posicion
      const sortedResults = [...racesData.race.results].sort(
        (a, b) => a.position - b.position,
      );

      this.logger.log('racesData->>>>>>>', racesData);
      const raceDetail: RaceDto = {
        id: racesData.race.id,
        date: racesData.race.date,
        laps: racesData.race.laps,
      };

      // Formatear los datos
      const formattedResults = sortedResults.map((result: RaceResultDto) => {
        const driver = driversMap.get(result.driver_id);
        return {
          position: result.position,
          driver_id: result.driver_id,
          laps: result.laps,
          time: result.time,
          driver: driver
            ? {
                id: driver.id,
                name: driver.name,
                team: driver.team,
                country: driver.country,
              }
            : null,
        };
      });

      return { race: raceDetail, results: formattedResults };
    } catch (error) {
      this.logger.error('Error fetching or formatting race data', error.stack);
      throw new Error('Error fetching or formatting race data');
    }
  }
}
