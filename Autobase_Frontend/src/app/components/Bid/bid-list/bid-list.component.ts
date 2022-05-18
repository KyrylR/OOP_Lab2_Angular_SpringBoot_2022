import {Component, OnInit} from '@angular/core';
import {Bid} from "../../../interface/bid";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../validators/custom-validators";
import {BidService} from "../../../services/bid.service";
import {ActivatedRoute} from "@angular/router";
import {DriverService} from "../../../services/driver.service";
import {Driver} from "../../../interface/driver";

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.css']
})
export class BidListComponent implements OnInit {

  bids: Bid[] = []
  drivers: Driver[] = []

  bidFormGroup!: FormGroup;

  private bid_default: any = {
    'workPurpose': '',
    'isFinished': false,
    'driverFeedback': '',
    'driver': ''
  }

  constructor(private formBuilder: FormBuilder,
              private bidService: BidService,
              private route: ActivatedRoute,
              private driverService: DriverService) {
  }

  get workPurpose() {
    return this.bidFormGroup.get('workPurpose');
  }

  get isFinished() {
    return this.bidFormGroup.get('isFinished');
  }

  get driverFeedback() {
    return this.bidFormGroup.get('driverFeedback');
  }

  get driverSelect() {
    return this.bidFormGroup.get('driverSelect');
  }

  ngOnInit(): void {
    this.bidService.getBids().subscribe(
      data => {
        this.bids = data;
      });

    this.bidFormGroup = this.formBuilder.group({
      driverFeedback: new FormControl('', [Validators.required,
        Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
      workPurpose: new FormControl('', [Validators.required,
        Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
      isFinished: new FormControl(''),
      driverSelect: new FormControl('', [Validators.required])
    });

    this.driverService.getDrivers().subscribe(
      data => {
        this.drivers = data;
      });
  }

  onPost() {
    // @ts-ignore
    if (this.bidFormGroup.invalid) {
      // @ts-ignore
      this.bidFormGroup.markAllAsTouched();
      return;
    }

    this.bid_default.workPurpose = this.workPurpose?.value;
    this.bid_default.finished = this.isFinished?.value;
    this.bid_default.driverFeedback = this.driverFeedback?.value;
    this.bid_default.driver = this.driverSelect?.value[0]?._links.self.href;
    this.bidService.createBid(this.bid_default).subscribe({
        next: response => {
          console.log(`Response from adding: ${response}`);
          this.bids.push(response)
        },
        error: err => {
          console.log(`There was an error: ${err.message}`);
        },
        complete: () => {
          console.log('Done add the bid');
        }
      }
    );
  }
}
