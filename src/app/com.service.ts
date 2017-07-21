import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Observer } from "rxjs/Observer";
import { ISubscription } from "rxjs/Subscription";
import 'rxjs/add/operator/share';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

interface Data {
  event: string;
  content: any;
}

@Injectable()
export class ComService {

  // constants
  public static WS_ENDPOINT = 'ws://interview.dev.ctx.ef.com/telemetry';
  public static TEST_MODE = true;

  public static FLAPS_CTRL = {
    MIN: 0,
    MAX: 5,
    STEP: 1,
    DEFAULT: 0
  };

  public static GEAR_CTRL = {
    MIN: {
      value: 0,
      position: 'retracted'
    },
    MAX: {
      value: 1,
      position: 'extended'
    },
    DEFAULT_VALUE: 0
  };

  public static MESSAGES = [
    {
      data: `{
        "control": {
          "landing_gear": 0,
          "flaps": 3
        },
        "telemetry": {
          "airspeed": 280,
          "altitude": 1250
        }
      }`
    },
    {
      data: `{
        "control": {
          "landing_gear": 1,
          "flaps": 1
        },
        "telemetry": {
          "airspeed": 80,
          "altitude": 880
        }
      }`
    },
    {
      data: `{
        "control": {
          "landing_gear": 0,
          "flaps": 3
        },
        "telemetry": {
          "airspeed": 245,
          "altitude": 1078
        }
      }`
    },
    {
      data: `{
        "control": {
          "landing_gear": 0,
          "flaps": 3
        },
        "telemetry": {
          "airspeed": 365,
          "altitude": 981
        }
      }`
    },
    {
      data: `{
        "control": {
          "landing_gear": 1,
          "flaps": 5
        },
        "telemetry": {
          "airspeed": 380,
          "altitude": 1050
        }
      }`
    },
    {
      data: `{
        "control": {
          "landing_gear": 1,
          "flaps": 2
        },
        "telemetry": {
          "airspeed": 405,
          "altitude": 1550
        }
      }`
    },
    {
      data: `{
        "control": {
          "landing_gear": 0,
          "flaps": 3
        },
        "telemetry": {
          "airspeed": 280,
          "altitude": 1250
        }
      }`
    },
    {
      data: `{
        "control": {
          "landing_gear": 0,
          "flaps": 3
        },
        "telemetry": {
          "airspeed": 325,
          "altitude": 975
        }
      }`
    },
    {
      data: `{
        "control": {
          "landing_gear": 1,
          "flaps": 2
        },
        "telemetry": {
          "airspeed": 240,
          "altitude": 1100
        }
      }`
    },
    {
      data: `{
        "control": {
          "landing_gear": 1,
          "flaps": 4
        },
        "telemetry": {
          "airspeed": 324,
          "altitude": 1260
        }
      }`
    }
  ];

  ws: any = null;


  private observable: Observable<MessageEvent>;
  private observer: Observer<MessageEvent>;
  private subscription: ISubscription;

  dataObservable: Observable<MessageEvent>;

  constructor() {

  }

	public connect(): Observable<MessageEvent> {

    if(this.ws === null) {

      if(ComService.TEST_MODE) {
          this.ws = {
            onmessage: (data) => {
              return data;
            },
            onerror: (error) => {
              return error;
            },
            onclose: () => {
              return true;
            },
            close: () => {
              this.ws = null;
            }
          };

          // Activate the fake websocket after a delay
          let timer = TimerObservable.create(2000);
          timer.subscribe(t=> {
              let interval = TimerObservable.create(1000, 1000);
              interval.subscribe(t=> {
                  this.ws.onmessage(ComService.MESSAGES[[0,1,2,3,4,5,6,7,8,9][Math.floor(Math.random()*9)]]);
              });
          });

      } else {
        this.ws = new WebSocket(ComService.WS_ENDPOINT);
      }


      if(this.subscription) {
    		//this.subscription.unsubscribe();
    		this.observable = null;
      }

    }

    if(!this.observable) {

      this.observable = Observable.create(
        (observer: Observer<MessageEvent>) => {
          this.ws.onmessage = observer.next.bind(observer);
          this.ws.onerror = observer.error.bind(observer);
          this.ws.onclose = observer.complete.bind(observer);
          return this.ws.close.bind(this.ws);
        }
      );

      this.subscription = this.observable
        .subscribe(data => {

          // test data and only send supported type of data
          try {
            let dataObj = JSON.parse(data.data);

            // prepare and validate data as well

            if(dataObj.control) {

                // landing gear
                if( dataObj.control.landing_gear == ComService.GEAR_CTRL.MIN.value || dataObj.control.landing_gear == ComService.GEAR_CTRL.MAX.value) {
                  this.dataReceived({event: 'gear', content: +dataObj.control.landing_gear});
                }

                // flaps
                if( dataObj.control.flaps >= ComService.FLAPS_CTRL.MIN && dataObj.control.flaps <= ComService.FLAPS_CTRL.MAX) {
                  this.dataReceived({event: 'flaps', content: +dataObj.control.flaps});
                }
            }

            // airspeed
            if(dataObj.telemetry && dataObj.telemetry.airspeed) {
              if(dataObj.telemetry.airspeed >= 0) {
                this.dataReceived({event: 'speed', content: +dataObj.telemetry.airspeed});
              }
            }

            // altitude
            if(dataObj.telemetry && dataObj.telemetry.altitude) {
              if(dataObj.telemetry.altitude >= 0) {
                this.dataReceived({event: 'altitude', content: +dataObj.telemetry.altitude});
              }
            }

          } catch(e) {
            if(typeof data.data == 'string') {
              this.dataReceived({ event: 'generic', content: data.data });
            }
          }


        }, error => {
          this.dataError(error);
        }, () => {
          this.ws = null;
          this.dataComplete();
        });

    }

    if(!this.dataObservable) {

      this.dataObservable = Observable.create(
        (observer: Observer<MessageEvent>) => {
          this.dataReceived = observer.next.bind(observer);
          this.dataError = observer.error.bind(observer);
          this.dataComplete = observer.complete.bind(observer);
        }
      ).share();

    }

    return this.dataObservable;
	}

	public disconnect() {
  	try {
    	this.ws.close();
    } catch(e) {

    }

    this.ws = null;
	}

  private sendMessage(message: any) {

    // sending the message
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }

    // @TODO create a queue of messages, in case readyState isn't OPEN
  }

	public setGear(value: number) {
  	// only send valid messages
  	if( value == ComService.GEAR_CTRL.MIN.value || value == ComService.GEAR_CTRL.MAX.value) {
      this.sendMessage({type: 'landing_gear', value: value});
    }
	}

	public setFlaps(value: number) {
  	// only send valid messages
  	if( value >= ComService.FLAPS_CTRL.MIN && value <= ComService.FLAPS_CTRL.MAX) {
      this.sendMessage({type: 'flaps', value: value});
    }
	}

	dataReceived(data: Data) {
  	return data;
  }

  dataError(error: any) {
    return error;
  }

  dataComplete() {

  }

}

