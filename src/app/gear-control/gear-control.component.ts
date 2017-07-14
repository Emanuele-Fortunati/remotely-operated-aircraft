import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gear-control',
  templateUrl: './gear-control.component.html',
  styleUrls: ['./gear-control.component.css']
})
export class GearControlComponent implements OnInit {

  @Input() currentValue: number = 0;
  @Input() uncheckedValue: number = 0;
  @Input() uncheckedPosition: string = '';
  @Input() checkedValue: number = 0;
  @Input() checkedPosition: string = '';

  @Output() update = new EventEmitter<any>();

  updatedValue: number = 0;

  constructor() {

  }

  ngOnInit() {
    this.updatedValue = this.currentValue;
  }

  controlGear(event: any) {
    this.updatedValue = event.checked? this.checkedValue : this.uncheckedValue;
    this.update.emit(this.updatedValue);
  }

}
