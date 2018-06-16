import { Component, Input } from '@angular/core';

@Component({
  selector: 'metric-block-widget',
  templateUrl: './metric-block-widget.component.html',
  styleUrls: ['./metric-block-widget.component.scss']
})
export class MetricBlockWidgetComponent {
  @Input()
  public metric: string = '0';

  @Input()
  public dimension: string;

  @Input()
  public message: string;

  @Input()
  public linkName: string;

  @Input()
  public linkAddress: string;

  constructor() { }

}
