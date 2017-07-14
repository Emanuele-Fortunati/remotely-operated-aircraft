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

  // app bootstrap
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // default values
  it(`should have gear as ComService.GEAR_CTRL`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.gear).toEqual(ComService.GEAR_CTRL);
  }));

  it(`should have gearReceived as ComService.GEAR_CTRL.DEFAULT_VALUE`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.gearReceived).toEqual(ComService.GEAR_CTRL.DEFAULT_VALUE);
  }));

  it(`should have flaps as ComService.FLAPS_CTRL`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.flaps).toEqual(ComService.FLAPS_CTRL);
  }));

  it(`should have flapsReceived as ComService.FLAPS_CTRL.DEFAULT_VALUE`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.flapsReceived).toEqual(ComService.FLAPS_CTRL.DEFAULT);
  }));

  it(`should have altitude1000 as 0`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.altitude1000).toEqual(0);
  }));

  it(`should have altitude100 as 0`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.altitude100).toEqual(0);
  }));

  // template elements
  it('should render app-connection-state', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-connection-state')).not.toBeNull();
  }));
  it('should render app-needle-gauge', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-needle-gauge')).not.toBeNull();
  }));
  it('should render app-numeric-gauge', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-numeric-gauge')).not.toBeNull();
  }));
  it('should render app-gear-control', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-gear-control')).not.toBeNull();
  }));
  it('should render app-flaps-control', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-flaps-control')).not.toBeNull();
  }));

});
