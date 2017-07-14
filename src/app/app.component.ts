import { Component } from '@angular/core';
import { ComService } from './com.service';
import { ISubscription } from "rxjs/Subscription";

/*
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
*/

/*
export interface Message {
	author: string,
	message: string,
	newDate?: string
}
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gear: any;
  gearReceived: number;

  flaps: any;
  flapsReceived: number;

  speedReceived: number;
  altitudeReceived: number;

  subscription: ISubscription;

  speedGaugeOptions: any;

  altitude1000GaugeOptions: any;
  altitude100GaugeOptions: any;

  altitude1000: number = 0;
  altitude100: number = 0;

  connection: string = 'offline';

  constructor(private comService: ComService) {
    // init gear controller
    this.gear = ComService.GEAR_CTRL;
    this.gearReceived = ComService.GEAR_CTRL.DEFAULT_VALUE;


    // init flaps controller
    this.flaps = ComService.FLAPS_CTRL;
    this.flapsReceived = ComService.FLAPS_CTRL.DEFAULT;

    // init gauges
    this.speedGaugeOptions = {
      gaugeRadius : 160,
      minVal : 0,
      maxVal : 420,
      needleVal : 0,
      tickSpaceMinVal : 10,
      tickSpaceMajVal : 40,
      divID : 'speedGauge',
      gaugeUnits : 'kts',
      unitsLabelCol: 'rgba(255, 255, 255, 0)'
    };
    this.altitude1000GaugeOptions = {
      gaugeRadius : 160,
      minVal : 0,
//       maxVal : 9,
      maxVal: 99,
      needleVal : 0,
      tickSpaceMinVal : 10,
//       tickSpaceMajVal : 1,
      tickSpaceMajVal : 10,
      divID : 'altitude1000Gauge',
      gaugeUnits : '',
      unitsLabelCol: 'rgba(255, 255, 255, 0)',
    };
    this.altitude100GaugeOptions = {
      gaugeRadius : 80,
      minVal : 0,
      maxVal : 9,
      needleVal : 0,
      tickSpaceMinVal : 1,
      tickSpaceMajVal : 1,
      divID : 'altitude100Gauge',
      gaugeUnits : '',
      unitsLabelCol: 'rgba(255, 255, 255, 0)',
      outerEdgeCol: 'rgba(255, 255, 255, 0)',
      innerCol: 'rgba(255, 255, 255, 0)',
      pivotCol: 'rgba(255, 255, 255, 0)'
    };


    // init connection to base
    this.connect();

  }

  connect() {

    this.subscription = this.comService.connect()
      .subscribe(eventData => {
        let data = eventData as any;

        // update values accordingly with message received type
        switch(data.event) {
          case 'speed':
            this.speedReceived = data.content;
            break;

          case 'altitude':
            this.altitudeReceived = data.content;

            // calculate altitude for gauges
            this.altitude1000 = data.content / 1000;
            this.altitude100 = (data.content / 1000 - Math.floor(data.content / 1000)) * 10;
            break;

          case 'gear':
            this.gearReceived = data.content;
            break;

          case 'flaps':
            this.flapsReceived = data.content;
            break;

        }


      }, error => {
        // reconnect
        this.subscription.unsubscribe();
        this.comService.disconnect();

        this.connect();

      }, () => {
        // reconnect
        this.subscription.unsubscribe();
        this.comService.connect();

        this.connect();
      });
  }

  // send message
  sendMessage(type: string, value: number) {
    switch(type) {
      case 'gear':
        this.comService.setGear(value);
        break;
      case 'flaps':
        this.comService.setFlaps(value);
        break;
    }
  }

  // update connection
  updateConnection(state: string) {
    this.connection = state;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
