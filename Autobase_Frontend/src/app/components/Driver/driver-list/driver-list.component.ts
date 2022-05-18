import {Component, OnInit} from '@angular/core';
import {Driver} from "../../../interface/driver";
import {DriverService} from "../../../services/driver.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators, unique} from "../../../validators/custom-validators";
import {KeycloakService} from "keycloak-angular";


@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  drivers: Driver[] = []
  driverFormGroup!: FormGroup;

  roles: string[] = [];

  private driver_default: any = {
    'name': ''
  }

  constructor(private formBuilder: FormBuilder,
              private driverService: DriverService,
              private keycloakService: KeycloakService) {
  }

  get driverName() {
    return this.driverFormGroup.get('driverName');
  }

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe(
      data =>  {
        this.drivers = data;
        console.log(data);
        this.driverFormGroup = this.formBuilder.group({
          driverName: new FormControl('',
            [Validators.required, Validators.minLength(2),
              CustomValidators.notOnlyWhitespace, unique(data)])
        });
      }
    );

    this.driverFormGroup = this.formBuilder.group({
      driverName: new FormControl('',
        [Validators.required, Validators.minLength(2),
          CustomValidators.notOnlyWhitespace])
    });

    // this.roles = this.keycloakService.getUserRoles();
    // console.log("Roles: " + this.roles);
  }

  get hasRole(): boolean {
    // let requiredRoles = ["ROLE_ADMIN"]
    // return requiredRoles.some((role) => this.roles.includes(role));
    return true;
  }

  onPost() {
    // @ts-ignore
    if (this.driverFormGroup.invalid) {
      // @ts-ignore
      this.driverFormGroup.markAllAsTouched();
      return;
    }

    this.driver_default.name = this.driverName?.value;
    console.log("Post: " + this.driver_default.name)
    this.driverService.createDriver(this.driver_default).subscribe({
        next: response => {
          console.log(`Response from posting: ${response}`)
          this.drivers.push(response)
        },
        error: err => {
          console.log(`There was an error: ${err.message}`);
        },
        complete: () => {
          console.log('Done add the driver');
        }
      }
    );
    this.driverService.createDriver(this.driver_default);
  }
}
