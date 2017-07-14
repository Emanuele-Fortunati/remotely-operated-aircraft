import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedleGaugeComponent } from './needle-gauge.component';
import { D3GaugeService } from '../d3gauge.service';

describe('NeedleGaugeComponent', () => {
  let component: NeedleGaugeComponent;
  let fixture: ComponentFixture<NeedleGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedleGaugeComponent ],
      providers: [ D3GaugeService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedleGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
