import { Component, Input } from '@angular/core';
import { GaugeModel } from './gauge-block-widget.model';
@Component({
  selector: 'gauge-block-widget',
  templateUrl: './gauge-block-widget.component.html',
  styleUrls: ['./gauge-block-widget.component.scss']
})
export class GaugeBlockWidgetComponent {
  @Input()
  private gaugeModel: GaugeModel;
  constructor() { }

  public get gauge() {
    const cleanModel = new GaugeModel();
    const returnModel = { ...cleanModel, ...this.gaugeModel };
    return returnModel;
  }
}
