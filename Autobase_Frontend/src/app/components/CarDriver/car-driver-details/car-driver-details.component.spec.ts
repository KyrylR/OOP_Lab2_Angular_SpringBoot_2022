import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDriverDetailsComponent } from './car-driver-details.component';

describe('CarDriverDetailsComponent', () => {
  let component: CarDriverDetailsComponent;
  let fixture: ComponentFixture<CarDriverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDriverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDriverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
