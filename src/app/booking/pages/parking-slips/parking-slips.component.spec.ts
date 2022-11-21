import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSlipsComponent } from './parking-slips.component';

describe('ParkingSlipsComponent', () => {
  let component: ParkingSlipsComponent;
  let fixture: ComponentFixture<ParkingSlipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingSlipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingSlipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
