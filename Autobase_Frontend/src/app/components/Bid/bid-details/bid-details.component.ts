import {Component, OnInit} from '@angular/core';
import {Bid} from "../../../interface/bid";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../validators/custom-validators";
import {BidService} from "../../../services/bid.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Driver} from "../../../interface/driver";
import {DriverService} from "../../../services/driver.service";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-bid-details',
  templateUrl: './bid-details.component.html',
  styleUrls: ['./bid-details.component.css']
})
export class BidDetailsComponent implements OnInit {

  bid!: Bid;
  drivers!: Driver[];

  bidDetailFormGroup!: FormGroup;

  roles: string[] = [];

  private bid_default: any = {
    'workPurpose': '',
    'isFinished': false,
    'driverFeedback': '',
    'driver': ''
  }

  constructor(private formBuilder: FormBuilder,
              private bidService: BidService,
              private route: ActivatedRoute,
              private driverService: DriverService,
              private router: Router,
              private keycloakService: KeycloakService) {
  }

  get workPurpose() {
    return this.bidDetailFormGroup.get('workPurpose');
  }

  get isFinished() {
    return this.bidDetailFormGroup.get('isFinished');
  }

  get driverFeedback() {
    return this.bidDetailFormGroup.get('driverFeedback');
  }

  get driverSelect() {
    return this.bidDetailFormGroup.get('driverSelect');
  }

  get hasRole(): boolean {
    let requiredRoles = ["ROLE_ADMIN", "ROLE_MANAGER"]
    return requiredRoles.some((role) => this.roles.includes(role));
    // return true;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.showBid();
    });

    this.bidDetailFormGroup = this.formBuilder.group({
      driverFeedback: new FormControl('', [Validators.required,
        Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
      workPurpose: new FormControl('', [Validators.required,
        Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
      isFinished: new FormControl(''),
      driverSelect: new FormControl('')
    });

    this.driverService.getDrivers().subscribe(
      data => {
        this.drivers = data;
      }
    );

    this.roles = this.keycloakService.getUserRoles();
  }

  showBid() {

    // @ts-ignore
    const bidId: number = +this.route.snapshot.paramMap.get('id');
    this.bidService.getBid(bidId).subscribe(data => {
      this.bid = data;
      // @ts-ignore
      console.log("Driver: " + (data.driverId))
    });
  }

  onUpdate() {
    // @ts-ignore
    if (this.bidDetailFormGroup.invalid) {
      // @ts-ignore
      this.bidDetailFormGroup.markAllAsTouched();
      return;
    }

    this.bid_default.workPurpose = this.workPurpose?.value;
    this.bid_default.isFinished = this.isFinished?.value;
    this.bid_default.driverFeedback = this.driverFeedback?.value;
    try {
      this.bid_default.driver = this.driverSelect?.value[0]?._links.self.href;
    } catch (Error) {
      this.bid_default.driver = this.driverSelect?.value[0];
    }
    if (this.bid.id != null) {
      this.bidService.updateBid(this.bid.id, this.bid_default).subscribe({
          next: response => {
            console.log(`Response from updating: ${response}`);
            this.bid = response;
          },
          error: err => {
            console.log(`There was an error: ${err.message}`);
          },
          complete: () => {
            console.log('Done update the bid');
          }
        }
      );
    }
  }

  onDelete() {
    if (this.bid.id != null) {
      this.bidService.deleteBid(this.bid.id).subscribe({
          next: response => {
            console.log(`Response from deleting: ${response}`);
          },
          error: err => {
            console.log(`There was an error: ${err.message}`);
          },
          complete: () => {
            console.log('Done delete the bid');
            this.router.navigate(['bids']);
          }
        }
      );
    }
  }
}
