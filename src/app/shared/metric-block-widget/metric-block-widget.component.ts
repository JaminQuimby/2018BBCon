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
  public blocks: MetricModel[] = [];

  constructor(
    private volunteerService: VolunteerBlockService,
    private donationService: DonationBlockService) {

  }

  public ngOnInit() {
    this.volunteerService.volunteer.subscribe((volunteer) => {
      console.log(volunteer);
      const type = 'hours';
      let filter = this.blocks.filter((block) => { return block.dimension !== type; });
      this.blocks = filter;
      this.blocks.push(volunteer);
      console.log('update metric hours');
    });
    this.donationService.donation.subscribe((donation) => {
      console.log(donation);
      this.blocks.push(donation);
    });
  }
}
