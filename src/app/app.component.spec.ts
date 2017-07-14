import { TestBed, async } from '@angular/core/testing';

import { MaterialModule } from '@angular/material';
import { ComService } from './com.service';
import { D3GaugeService } from './d3gauge.service';

import { AppComponent } from './app.component';
import { NumericGaugeComponent } from './numeric-gauge/numeric-gauge.component';
import { FlapsControlComponent } from './flaps-control/flaps-control.component';
import { GearControlComponent } from './gear-control/gear-control.component';
import { ConnectionStateComponent } from './connection-state/connection-state.component';
import { NeedleGaugeComponent } from './needle-gauge/needle-gauge.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NumericGaugeComponent,
        FlapsControlComponent,
        GearControlComponent,
        ConnectionStateComponent,
        NeedleGaugeComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [ ComService, D3GaugeService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

/*
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  }));
*/
});
