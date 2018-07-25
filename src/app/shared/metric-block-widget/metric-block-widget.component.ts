import { Component, Input } from '@angular/core';
import { MetricModel } from './metric-block-widget.model';
@Component({
  selector: 'metric-block-widget',
  templateUrl: './metric-block-widget.component.html',
  styleUrls: ['./metric-block-widget.component.scss']
})
export class MetricBlockWidgetComponent {
  @Input()
  private metricModel: MetricModel;
  constructor() { }
  public get dimension() { return this.metricModel.dimension; }
  public get linkAddress() { return this.metricModel.linkAddress; }
  public get linkName() { return this.metricModel.linkName; }
  public get message() { return this.metricModel.message; }
  public get metric() { return this.metricModel.metric; }
  public get metricPrefix() { return this.metricModel.metricPrefix; }
  public hasMetric() {
    if (this.metric >= 1) { return true; }
    return false;
  }
}
