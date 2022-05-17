import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDriverListComponent } from './car-driver-list.component';

describe('CarDriverListComponent', () => {
  let component: CarDriverListComponent;
  let fixture: ComponentFixture<CarDriverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDriverListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
