import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-numeric-gauge',
  templateUrl: './numeric-gauge.component.html',
  styleUrls: ['./numeric-gauge.component.css']
})
export class NumericGaugeComponent implements OnInit {

  @Input() current: number = 0;
  @Input() unit: string = '';

  min: number;
  max: number;
  avg: number;
  numberOfMeasures: number = 0;

  view: string = 'current';
  views: Array<string> = ['current', 'max', 'min', 'avg'];

  Math: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.current) {

      if(!changes.current.firstChange) {

        // init
        if(this.min == undefined) {

          this.min = changes.current.currentValue;
          this.max = changes.current.currentValue;
          this.avg = changes.current.currentValue;

        } else {

          // Min and Max
          this.min = Math.min(changes.current.currentValue, this.min);
          this.max = Math.max(changes.current.currentValue, this.max);

          // Average
          this.avg = (this.avg * this.numberOfMeasures + +changes.current.currentValue) / (this.numberOfMeasures + 1);

        }



        this.numberOfMeasures++;

      }


    }
  }

  // change view
  changeView() {
    let index = this.views.indexOf(this.view);
    index++;
    if(index == this.views.length) {
      index = 0;
    }

    this.view = this.views[index];
  }

}
