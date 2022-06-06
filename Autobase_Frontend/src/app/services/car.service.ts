import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../interface/car";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  //TODO real url
  private baseCarUrl = environment.apiUrl + "cars";

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<Car[]> {
    console.log("get cars!")
    return this.httpClient.get<Car[]>(this.baseCarUrl);
  }

  getCar(id: number): Observable<Car> {
    const carUrl = `${this.baseCarUrl}/${id}`;

    return this.httpClient.get<Car>(carUrl);
  }

  createCar(car: Car): Observable<Car>{
    return this.httpClient.post<Car>(`${this.baseCarUrl}`,car);
  }

  patchCar(id: number, car: any): Observable<Car> {
    const carUrl = `${this.baseCarUrl}/${id}`;

    return this.httpClient.put<Car>(carUrl, car);
  }

  deleteCar(id: number): Observable<unknown>{
    return this.httpClient.delete<unknown>(`${this.baseCarUrl}/${id}`);
  }
}
