import { Component } from '@angular/core';
import { ConstituentService } from './constituent.service';
import { BBSessionService } from '../bbsession.service';
import { VolunteerBlockService } from '../../../blockchain/volunteer.block.service';
import { DonationBlockService } from '../../../blockchain/donation.block.service';
@Component({
  selector: 'bb-constituent',
  template: require('./constituent.component.html'),
  styleUrls: ['./constituent.component.scss'],
  providers: [ConstituentService]
})
export class ConstituentComponent {
  private constituentId: number = 1098;
  public constituent: any;
  public volunteer: any;
  public onlinePresenceList: any;
  public groups: any[];
  public blockChain: string;
  constructor(
    private volunteerBlockService: VolunteerBlockService,
    private donationBlockService: DonationBlockService,
    private constituentService: ConstituentService,
    private sessionService: BBSessionService
  ) {
    this.getData();
  }
  public tabChanged(newIndex: any) {
    console.log(`new active ${newIndex}`);
  }

  public async getData() {
    this.constituent = await this.constituentService.getById(this.constituentId);
    this.volunteer = await this.constituentService.getLatestVolunteer(this.constituentId);
    this.onlinePresenceList = await this.constituentService.getOnlinePresenceList(this.constituentId);
    this.blockchainAddress();
  }

  public giveGift() {
    const to = this.blockChain;
    console.log('to', to);
    this.donationBlockService.setDonationBlock({ to: to, dimension: 'dollars', metric: 1 });
  }

  public logVolnteerHours() {
    const to = this.blockChain;
    console.log('to', to);
    this.volunteerBlockService.setVolunteerBlock({ to: to, dimension: 'hours', metric: 1 });
  }

  public blockchainAddress() {

    const onlinePresenceList = this.onlinePresenceList;

    const filter = onlinePresenceList.filter((blockAddress: any) => { return blockAddress.type === 'Webaddress1'; });
    console.log('filter', filter[0].address);
    this.blockChain = filter[0].address;
    return filter[0].address;
  }

  public logout(): void {
    this.sessionService.logout();
  }
}
