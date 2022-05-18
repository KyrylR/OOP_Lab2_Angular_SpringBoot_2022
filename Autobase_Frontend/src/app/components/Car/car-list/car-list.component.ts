import { Component, OnInit } from '@angular/core';
import {Car} from "../../../interface/car";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../validators/custom-validators";
import {CarService} from "../../../services/car.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Car[] = []

  carFormGroup!: FormGroup;

  private car_default: any = {
    'purpose': '',
    'ready': true
  }
  roles: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private keycloakService: KeycloakService) {
  }

  get carPurpose() {
    return this.carFormGroup.get('carPurpose');
  }

  get carReady() {
    return this.carFormGroup.get('carReady');
  }

  get hasRole(): boolean {
    let requiredRoles = ["ROLE_ADMIN"]
    return requiredRoles.some((role) => this.roles.includes(role));
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe(
      data => {
        this.cars = data;
      }
    );

    this.carFormGroup = this.formBuilder.group({
      carPurpose: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
      carReady: new FormControl('')
    });

    this.roles = this.keycloakService.getUserRoles();
    console.log("Roles: " + this.roles);
  }

  onPost() {
    // @ts-ignore
    if (this.carFormGroup.invalid) {
      // @ts-ignore
      this.carFormGroup.markAllAsTouched();
      return;
    }

    this.car_default.purpose = this.carPurpose?.value;
    this.car_default.ready = this.carReady?.value;

    console.log("Ready: " +  this.car_default.isReady)
    this.carService.createCar(this.car_default).subscribe({
        next: response => {
          console.log(`Response from deleting: ${response}`);
          this.cars.push(response);
        },
        error: err => {
          console.log(`There was an error: ${err.message}`);
        },
        complete: () => {
          console.log('Done delete the car');
        }
      }
    );
  }

}
