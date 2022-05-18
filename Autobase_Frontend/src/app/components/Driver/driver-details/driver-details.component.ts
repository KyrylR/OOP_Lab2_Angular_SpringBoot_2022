import {Component, OnInit} from '@angular/core';
import {Driver} from "../../../interface/driver";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators, unique} from "../../../validators/custom-validators";
import {DriverService} from "../../../services/driver.service";
import {ActivatedRoute, Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  driver!: Driver;
  driverDetailFormGroup!: FormGroup;

  roles: string[] = [];

  private driver_default: any = {
    'name': ''
  }

  constructor(private formBuilder: FormBuilder,
              private driverService: DriverService,
              private route: ActivatedRoute,
              private router: Router,
              private keycloakService: KeycloakService) {
  }

  get driverDetailName() {
    return this.driverDetailFormGroup.get('driverDetailName');
  }

  get hasRole(): boolean {
    let requiredRoles = ["ROLE_ADMIN"]
    return requiredRoles.some((role) => this.roles.includes(role));
    // return true;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.showDriver();
    });

    this.driverService.getDrivers().subscribe(
      data => {
        this.driverDetailFormGroup = this.formBuilder.group({
          driverDetailName: new FormControl('',
            [Validators.required, Validators.minLength(2),
              CustomValidators.notOnlyWhitespace, unique(data)]),
        });
      }
    );

    this.driverDetailFormGroup = this.formBuilder.group({
      driverDetailName: new FormControl('',
        [Validators.required, Validators.minLength(2),
          CustomValidators.notOnlyWhitespace]),
    });

    this.roles = this.keycloakService.getUserRoles();
  }

  showDriver() {

    // @ts-ignore
    const driverId: number = +this.route.snapshot.paramMap.get('id');
    this.driverService.getDriver(driverId).subscribe(data => {
      this.driver = data;
    });
  }

  onUpdate() {
    // @ts-ignore
    if (this.driverDetailFormGroup.invalid) {
      // @ts-ignore
      this.driverDetailFormGroup.markAllAsTouched();
      return;
    }

    this.driver_default.name = this.driverDetailName?.value;
    if (this.driver.id != null) {
      this.driverService.patchDriver(this.driver.id, this.driver_default).subscribe({
          next: response => {
            console.log(`Response from updating: ${response}`);
            this.driver.name = response.name
          },
          error: err => {
            console.log(`There was an error: ${err.message}`);
          },
          complete: () => {
            console.log('Done update the driver');
          }
        }
      );
    }
  }

  onDelete() {
    if (this.driver.id != null) {
      this.driverService.deleteDriver(this.driver.id, this.driver).subscribe({
          next: response => {
            console.log(`Response from deleting: ${response}`);
          },
          error: err => {
            console.log(`There was an error: ${err.message}`);
          },
          complete: () => {
            console.log('Done delete the driver');
            this.router.navigate(['drivers']);
          }
        }
      );
    }
  }
}
