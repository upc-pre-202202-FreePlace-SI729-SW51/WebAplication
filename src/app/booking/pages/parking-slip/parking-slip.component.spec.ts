import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSlipComponent } from './parking-slip.component';

describe('ParkingSlipComponent', () => {
  let component: ParkingSlipComponent;
  let fixture: ComponentFixture<ParkingSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingSlipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
