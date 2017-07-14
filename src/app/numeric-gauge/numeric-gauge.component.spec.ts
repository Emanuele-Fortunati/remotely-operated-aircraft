import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericGaugeComponent } from './numeric-gauge.component';

describe('NumericGaugeComponent', () => {
  let component: NumericGaugeComponent;
  let fixture: ComponentFixture<NumericGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
