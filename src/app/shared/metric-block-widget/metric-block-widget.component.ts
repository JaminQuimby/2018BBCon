import { Component, Input } from '@angular/core';
import { MetricModel } from './metric-block-widget.model';
@Component({
  selector: 'metric-block-widget',
  templateUrl: './metric-block-widget.component.html',
  styleUrls: ['./metric-block-widget.component.scss']
})
export class MetricBlockWidgetComponent {
  @Input()
  private metricModel: MetricModel[];
  constructor() { }

  public get metrics() {
    return this.metricModel;
  }
}
