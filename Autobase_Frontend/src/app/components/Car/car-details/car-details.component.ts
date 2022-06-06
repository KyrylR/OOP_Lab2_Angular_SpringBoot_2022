import {Component, OnInit} from '@angular/core';
import {Car} from "../../../interface/car";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../validators/custom-validators";
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../../services/car.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  car!: Car;

  carDetailFormGroup!: FormGroup

  roles: string[] = [];

  private car_default: any = {
    'id': -1,
    'purpose': '',
    'ready': true
  }

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private route: ActivatedRoute,
              private router: Router,
              private keycloakService: KeycloakService) {
  }

  get carDetailPurpose() {
    return this.carDetailFormGroup.get('carDetailPurpose');
  }

  get carDetailReady() {
    return this.carDetailFormGroup.get('carDetailReady');
  }

  get hasRole(): boolean {
    let requiredRoles = ["ROLE_ADMIN"]
    return requiredRoles.some((role) => this.roles.includes(role));
    // return true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.showCar();
    });

    this.carDetailFormGroup = this.formBuilder.group({
      carDetailPurpose: new FormControl('', [Validators.required,
        Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
      carDetailReady: new FormControl('')
    });

    this.roles = this.keycloakService.getUserRoles();
  }

  showCar() {

    // @ts-ignore
    const carId: number = +this.route.snapshot.paramMap.get('id');
    this.carService.getCar(carId).subscribe(data => {
      this.car = data;
      console.log("Ready: " + data.ready)
    });
  }

  onUpdate() {
    // @ts-ignore
    if (this.carDetailFormGroup.invalid) {
      // @ts-ignore
      this.carDetailFormGroup.markAllAsTouched();
      return;
    }

    this.car_default.purpose = this.carDetailPurpose?.value;
    this.car_default.ready = this.carDetailReady?.value;

    console.log("Detail ready: " + this.car_default.ready);
    if (this.car.id != null) {
      this.carService.patchCar(this.car.id, this.car_default).subscribe({
          next: response => {
            console.log(`Response from updating: ${response}`);
            this.car = response;
          },
          error: err => {
            console.log(`There was an error: ${err.message}`);
          },
          complete: () => {
            console.log('Done update the car');
          }
        }
      );
    }
  }

  onDelete() {
    if (this.car.id != null) {
      this.carService.deleteCar(this.car.id).subscribe({
          next: response => {
            console.log(`Response from deleting: ${response}`);
          },
          error: err => {
            console.log(`There was an error: ${err.message}`);
          },
          complete: () => {
            console.log('Done delete the car');
            this.router.navigate(['cars']);
          }
        }
      );
    }
  }
}
