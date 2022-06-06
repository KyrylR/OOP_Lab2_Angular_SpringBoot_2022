import {Component, OnInit} from '@angular/core';
import {CarDriver} from "../../../interface/car-driver";
import {Driver} from "../../../interface/driver";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarDriverService} from "../../../services/car-driver.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DriverService} from "../../../services/driver.service";
import {Car} from "../../../interface/car";
import {CarService} from "../../../services/car.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-car-driver-details',
  templateUrl: './car-driver-details.component.html',
  styleUrls: ['./car-driver-details.component.css']
})
export class CarDriverDetailsComponent implements OnInit {

  car_driver!: CarDriver;
  drivers!: Driver[];
  cars!: Car[];

  car_driverDetailFormGroup!: FormGroup;

  roles: string[] = [];

  private car_driver_default: any = {
    'carId': '',
    'driverId': ''
  }

  constructor(private formBuilder: FormBuilder,
              private car_driverService: CarDriverService,
              private route: ActivatedRoute,
              private router: Router,
              private driverService: DriverService,
              private carService: CarService,
              private keycloakService: KeycloakService) {
  }

  get carDetailSelect() {
    return this.car_driverDetailFormGroup.get('carDetailSelect');
  }

  get driverDetailSelect() {
    return this.car_driverDetailFormGroup.get('driverDetailSelect');
  }

  get hasRole(): boolean {
    let requiredRoles = ["ROLE_ADMIN"]
    return requiredRoles.some((role) => this.roles.includes(role));
    // return true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.showCarDriver();
    });

    this.car_driverDetailFormGroup = this.formBuilder.group({
      carDetailSelect: new FormControl('', [Validators.required]),
      driverDetailSelect: new FormControl('', [Validators.required]),
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

  showCarDriver() {

    // @ts-ignore
    const car_driverId: number = +this.route.snapshot.paramMap.get('id');
    this.car_driverService.getCarDriver(car_driverId).subscribe(data => {
      this.car_driver = data;
    });
  }

  onUpdate() {
    // @ts-ignore
    if (this.car_driverDetailFormGroup.invalid) {
      // @ts-ignore
      this.car_driverDetailFormGroup.markAllAsTouched();
      return;
    }

    this.car_driver_default.carId = this.carDetailSelect?.value[0].id;
    this.car_driver_default.driverId = this.driverDetailSelect?.value[0].id;

    if (this.car_driver.id != null) {
      this.car_driverService.patchCarDriver(this.car_driver.id, this.car_driver_default).subscribe({
        next: response => {
          console.log(`Response from updating: ${response}`);
          this.car_driver = response;
        },
        error: err => {
          console.log(`There was an error: ${err.message}`);
        },
          complete: () => {
            console.log('Done update the car_driver');
          }
        }
      );
    }
  }

  onDelete() {
    if (this.car_driver.id != null) {
      this.car_driverService.deleteCarDriver(this.car_driver.id).subscribe({
          next: response => {
            console.log(`Response from deleting: ${response}`);
          },
          error: err => {
            console.log(`There was an error: ${err.message}`);
          },
          complete: () => {
            console.log('Done delete the car_driver');
            this.router.navigate(['carDrivers']);
          }
        }
      );
    }
  }
}
