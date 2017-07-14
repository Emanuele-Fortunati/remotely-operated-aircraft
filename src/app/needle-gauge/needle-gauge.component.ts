import { Component, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import { D3GaugeService } from '../d3gauge.service';

@Component({
  selector: 'app-needle-gauge',
  templateUrl: './needle-gauge.component.html',
  styleUrls: ['./needle-gauge.component.css']
})
export class NeedleGaugeComponent implements AfterViewInit {

  @Input() options: any;
  @Input() id: string;
  @Input() value: number;

  private gauge;

  constructor(private d3gauge: D3GaugeService) {

  }

  ngAfterViewInit() {
    // draw gauge
    if(this.options != undefined) {
      this.gauge = this.d3gauge.drawGauge(this.options);
    }

  }

  ngOnChanges(changes: SimpleChanges) {

    // update gauge
    if(changes.value && changes.value.currentValue != undefined) {

      if(this.gauge) {
        this.gauge(changes.value.currentValue);
      } /*
else {
        this.gauge = this.d3gauge.drawGauge(this.options);
      }
*/

    }

  }

}
