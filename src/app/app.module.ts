import 'hammerjs';  // touch support for angular material
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { ComService } from './com.service';
import { D3GaugeService } from './d3gauge.service';


import { AppComponent } from './app.component';
import { NumericGaugeComponent } from './numeric-gauge/numeric-gauge.component';
import { FlapsControlComponent } from './flaps-control/flaps-control.component';
import { GearControlComponent } from './gear-control/gear-control.component';
import { ConnectionStateComponent } from './connection-state/connection-state.component';
import { NeedleGaugeComponent } from './needle-gauge/needle-gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    NumericGaugeComponent,
    FlapsControlComponent,
    GearControlComponent,
    ConnectionStateComponent,
    NeedleGaugeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ComService, D3GaugeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
