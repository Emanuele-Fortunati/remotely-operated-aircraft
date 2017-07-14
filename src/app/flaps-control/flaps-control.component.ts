import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flaps-control',
  templateUrl: './flaps-control.component.html',
  styleUrls: ['./flaps-control.component.css']
})
export class FlapsControlComponent implements OnInit {

  @Input() currentValue: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Input() step: number = 0;

  @Output() update = new EventEmitter<any>();

  updatedValue: number = 0;

  constructor() { }

  ngOnInit() {
    this.updatedValue = this.currentValue;
  }

  controlFlap(event: any) {
    this.updatedValue = event.value;
    this.update.emit(event.value);
  }

}
