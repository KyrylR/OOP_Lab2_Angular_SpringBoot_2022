import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable } from "rxjs";
import {Driver} from "../interface/driver";
import {map} from "rxjs/operators";
import {KeycloakBearerInterceptor} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  //TODO real url
  private baseDriverUrl = environment.apiUrl + "drivers";

  constructor(private httpClient: HttpClient) {
  }

  getDrivers(): Observable<Driver[]> {
    // let headers = new HttpHeaders()
    //   .set('content-type','application/json')
    //   .set('Access-Control-Allow-Origin', '*')
    //   .append('content-type','application/x-www-form-urlencoded')
    return this.httpClient.get<GetResponseDrivers>(this.baseDriverUrl).pipe(
      map(response => response._embedded.drivers));
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

    return this.httpClient.patch<Driver>(driverUrl, driver);
  }

  deleteDriver(id: number, driver: Driver): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${this.baseDriverUrl}/${id}`);
  }
}

interface GetResponseDrivers {
  _embedded: {
    drivers: Driver[];
  }
}
