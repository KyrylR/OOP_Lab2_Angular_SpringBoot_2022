import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Driver} from "../interface/driver";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  //TODO real url
  private baseDriverUrl = environment.apiUrl + "drivers";

  constructor(private httpClient: HttpClient) {
  }

  getDrivers(): Observable<Driver[]> {
    return this.httpClient.get<Driver[]>(this.baseDriverUrl);
  }

  getDriver(id: number): Observable<Driver> {
    const driverUrl = `${this.baseDriverUrl}/${id}`;

    return this.httpClient.get<Driver>(driverUrl);
  }

  createDriver(driver: any): Observable<Driver> {
    return this.httpClient.post<Driver>(`${this.baseDriverUrl}`, driver);
  }

  patchDriver(id: number, driver: any): Observable<Driver> {
    const driverUrl = `${this.baseDriverUrl}/${id}`;

    return this.httpClient.put<Driver>(driverUrl, driver);
  }

  deleteDriver(id: number, driver: Driver): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${this.baseDriverUrl}/${id}`);
  }
}
