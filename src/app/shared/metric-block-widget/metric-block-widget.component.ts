import { Component, Input } from '@angular/core';
import { MetricModel } from './metric-block-widget';
@Component({
  selector: 'metric-block-widget',
  templateUrl: './metric-block-widget.component.html',
  styleUrls: ['./metric-block-widget.component.scss']
})
export class MetricBlockWidgetComponent {
  @Input()
  public metricModel: MetricModel;
}
