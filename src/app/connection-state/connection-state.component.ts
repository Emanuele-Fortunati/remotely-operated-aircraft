import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComService } from '../com.service';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-connection-state',
  templateUrl: './connection-state.component.html',
  styleUrls: ['./connection-state.component.css'],
//   providers: [ComService]
})
export class ConnectionStateComponent implements OnInit {

  @Output() update = new EventEmitter<any>();

  state: string = 'offline';

  subscription: ISubscription;

  constructor(private comService: ComService) {

    this.state = 'connecting';
    this.update.emit(this.state);

    this.connect();

  }

  ngOnInit() {
  }

  connect() {

    this.subscription = this.comService.connect()
      .subscribe(data => {
        this.state = 'online';
        this.update.emit(this.state);
      }, error => {
        this.state = 'offline';
        this.update.emit(this.state);
        this.subscription.unsubscribe();
        this.comService.disconnect();
        this.connect();
        this.state = 'connecting';
        this.update.emit(this.state);
      }, () => {
        this.state = 'offline';
        this.update.emit(this.state);
        this.subscription.unsubscribe();
        this.connect();
        this.state = 'connecting';
        this.update.emit(this.state);
      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
