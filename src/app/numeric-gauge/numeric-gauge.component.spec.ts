import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';

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

  // bootstrap
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // unit testing
  it(`should have min as 23, max as 23, avg as 23`, async(() => {
    component.current = 23;

    component.ngOnChanges({
      current: new SimpleChange(null, component.current, true)
    });

    fixture.detectChanges();
    expect(component.min).toBe(23);
    expect(component.max).toBe(23);
    expect(component.avg).toBe(23);

  }));

  it(`should have min as 0, max as 0, avg as 0`, async(() => {
    component.current = undefined;

    component.ngOnChanges({
      current: new SimpleChange(null, component.current, true)
    });

    fixture.detectChanges();
    expect(component.min).toBe(0);
    expect(component.max).toBe(0);
    expect(component.avg).toBe(0);

  }));

  it(`should have min as 0, max as 0, avg as 0`, async(() => {
    component.current = -124;

    component.ngOnChanges({
      current: new SimpleChange(null, component.current, false)
    });

    fixture.detectChanges();
    expect(component.min).toBe(0);
    expect(component.max).toBe(0);
    expect(component.avg).toBe(0);

  }));

  it(`should have min as 12, max as 30, avg as 21`, async(() => {
    component.current = 30;

    component.ngOnChanges({
      current: new SimpleChange(null, component.current, false)
    });

    fixture.detectChanges();

    component.current = 12;

    component.ngOnChanges({
      current: new SimpleChange(null, component.current, false)
    });

    fixture.detectChanges();

    expect(component.min).toBe(12);
    expect(component.max).toBe(30);
    expect(component.avg).toBe(21);

  }));

  // click events


});
