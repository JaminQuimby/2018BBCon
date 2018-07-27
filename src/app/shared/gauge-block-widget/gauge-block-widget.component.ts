import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GaugeModel } from './gauge-block-widget.model';
import { Container } from '../database.service';
import { MetricModel } from '../metric-block-widget/metric-block-widget.model';
import { VolunteerBlockService } from '../../blockchain/volunteer.block.service';
import { DonationBlockService } from '../../blockchain/donation.block.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
@Component({
  selector: 'gauge-block-widget',
  templateUrl: './gauge-block-widget.component.html',
  styleUrls: ['./gauge-block-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaugeBlockWidgetComponent {

  @Container(`users/$uid$/goals`)
  public gaugeModel: GaugeModel[];
  public offline: boolean = true;
  private _blocks: Array<MetricModel> = [];

  constructor(
    private volunteerService: VolunteerBlockService,
    private donationService: DonationBlockService,
    private cd: ChangeDetectorRef
  ) {
    this.volunteerService.volunteer.subscribe((volunteer) => {
      this._blocks.push(volunteer);
    });
    this.donationService.donation.subscribe((donation) => {
      this._blocks.push(donation);
    });

    Observable.timer(1000, 10000).take(2)
      .subscribe(() => this.cd.detectChanges());
  }

  public get gauges() {
    return this.gaugeModel;
  }

  public value(type: any) {
    const filter = this._blocks.filter((block) => { return block.dimension === type; });
    console.log('filter', filter[0]);
    if (filter[0]) {
      this.offline = false;
      return filter[0].metric || 0;
    }
    return -1;
  }

}
