import { Component, OnInit } from '@angular/core';
import { MetricModel } from './metric-block-widget.model';
import { VolunteerBlockService } from '../../blockchain/volunteer.block.service';
import { DonationBlockService } from '../../blockchain/donation.block.service';

@Component({
  selector: 'metric-block-widget',
  templateUrl: './metric-block-widget.component.html',
  styleUrls: ['./metric-block-widget.component.scss']
})
export class MetricBlockWidgetComponent implements OnInit {
  public metrics: MetricModel[] = [];

  constructor(
    private volunteerService: VolunteerBlockService,
    private donationService: DonationBlockService) {

  }
  public ngOnInit() {
    this.volunteerService.volunteer.subscribe((volunteer) => { this.metrics.push(volunteer); });
    this.donationService.donation.subscribe((donation) => { this.metrics.push(donation); });
  }
}
