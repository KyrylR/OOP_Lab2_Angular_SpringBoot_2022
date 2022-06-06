import {Component, OnInit} from '@angular/core';
import {CarDriver} from "../../../interface/car-driver";
import {Driver} from "../../../interface/driver";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarDriverService} from "../../../services/car-driver.service";
import {ActivatedRoute} from "@angular/router";
import {DriverService} from "../../../services/driver.service";
import {CarService} from "../../../services/car.service";
import {Car} from "../../../interface/car";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-car-driver-list',
  templateUrl: './car-driver-list.component.html',
  styleUrls: ['./car-driver-list.component.css']
})
export class CarDriverListComponent implements OnInit {

  car_drivers: CarDriver[] = []
  drivers: Driver[] = []
  cars: Car[] = []

  car_driverFormGroup!: FormGroup;

  roles: string[] = [];

  private car_driver_default: any = {
    'carId': '',
    'driverId': ''
  }

  constructor(private formBuilder: FormBuilder,
              private car_driverService: CarDriverService,
              private route: ActivatedRoute,
              private driverService: DriverService,
              private carService: CarService,
              private keycloakService: KeycloakService) {
  }

  get carSelect() {
    return this.car_driverFormGroup.get('carSelect');
  }

  get driverSelect() {
    return this.car_driverFormGroup.get('driverSelect');
  }

  get hasRole(): boolean {
    let requiredRoles = ["ROLE_ADMIN"]
    return requiredRoles.some((role) => this.roles.includes(role));
    // return true;
  }

  ngOnInit(): void {
    this.car_driverFormGroup = this.formBuilder.group({
      carSelect: new FormControl('', [Validators.required]),
      driverSelect: new FormControl('', [Validators.required]),
    });

    this.car_driverService.getCarDrivers().subscribe(
      data => {
        this.car_drivers = data;
        console.log(data)
      });

    this.driverService.getDrivers().subscribe(
      data => {
        this.drivers = data;
      }
    );

    this.carService.getCars().subscribe(
      data => {
        this.cars = data;
      }
    );

    this.roles = this.keycloakService.getUserRoles();
  }

  onPost() {
    // @ts-ignore
    if (this.car_driverFormGroup.invalid) {
      // @ts-ignore
      this.car_driverFormGroup.markAllAsTouched();
      return;
    }

    this.car_driver_default.carId = this.carSelect?.value[0].id;
    this.car_driver_default.driverId = this.driverSelect?.value[0].id;
    this.car_driverService.createCarDriver(this.car_driver_default).subscribe({
      next: response => {
        console.log(`Response from deleting: ${response}`);
        this.car_drivers.push(response);
      },
      error: err => {
        console.log(`There was an error: ${err.message}`);
      },
      complete: () => {
        console.log('Done delete the car_driver');
        }
      }
    );
  }
}

