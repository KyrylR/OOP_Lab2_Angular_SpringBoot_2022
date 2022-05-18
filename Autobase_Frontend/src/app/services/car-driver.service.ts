import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CarDriver} from "../interface/car-driver";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CarDriverService {

  //TODO real url
  private baseCarDriverUrl = environment.apiUrl + "carDrivers";

  constructor(private httpClient: HttpClient) {
  }

  getCarDrivers(): Observable<CarDriver[]> {
    return this.httpClient.get<GetResponseCarDrivers>(this.baseCarDriverUrl).pipe(
      map(response => response._embedded.carDrivers)
    );
  }

  getCarDriver(id: number): Observable<CarDriver> {
    const carDriverUrl = `${this.baseCarDriverUrl}/${id}`;

    return this.httpClient.get<CarDriver>(carDriverUrl);
  }

  createCarDriver(carDriver: CarDriver): Observable<CarDriver> {
    return this.httpClient.post<CarDriver>(`${this.baseCarDriverUrl}`, carDriver);
  }

  patchCarDriver(id: number, carDriver: any): Observable<CarDriver> {
    const carDriverUrl = `${this.baseCarDriverUrl}/${id}`;

    return this.httpClient.patch<CarDriver>(carDriverUrl, carDriver);
  }

  deleteCarDriver(id: number): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${this.baseCarDriverUrl}/${id}`);
  }
}

interface GetResponseCarDrivers {
  _embedded: {
    carDrivers: CarDriver[];
  }
}

