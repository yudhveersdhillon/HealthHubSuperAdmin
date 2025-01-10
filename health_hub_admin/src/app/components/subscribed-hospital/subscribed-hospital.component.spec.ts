import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedHospitalComponent } from './subscribed-hospital.component';

describe('SubscribedHospitalComponent', () => {
  let component: SubscribedHospitalComponent;
  let fixture: ComponentFixture<SubscribedHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscribedHospitalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribedHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
