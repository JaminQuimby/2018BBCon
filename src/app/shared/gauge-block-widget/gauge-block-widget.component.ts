import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GaugeModel } from './gauge-block-widget.model';
import { Container } from '../database.service';
import { MetricModel } from '../metric-block-widget/metric-block-widget.model';

@Component({
  selector: 'gauge-block-widget',
  templateUrl: './gauge-block-widget.component.html',
  styleUrls: ['./gauge-block-widget.component.scss']
})
export class GaugeBlockWidgetComponent {

  @Container(`users/$uid$/goals`)
  public gaugeModel: GaugeModel | GaugeModel[];

  @Input()
  public donation: MetricModel;
  @Input()
  public volunteer: MetricModel;

  constructor() { }

  public get gauges() {
    return this.gaugeModel;
  }

  public value(type: string) {
    if (type === 'hours') {
      return this.volunteer.metric;
    }
    if (type === 'dollars') {
      return this.donation.metric;
    }
  }

}
