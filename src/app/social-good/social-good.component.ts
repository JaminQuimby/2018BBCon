import { Component } from '@angular/core';
import { SocialGoodContext } from './social-good.context';
import { SocialGoodFormComponent } from './social-good-form.component';
import { Container } from '../shared/database.service';

import {
  SkyModalService,
  SkyModalCloseArgs
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'demo-social-good',
  templateUrl: './social-good.component.html',
  styleUrls: ['./social-good.component.scss']
})
export class SocialGoodComponent {
  @Container(`users/$uid$/social-good`)
  public socialGood: SocialGoodContext | SocialGoodContext[];

  constructor(private modal: SkyModalService) { }

  public somePlace() {
    const socialGood = {
      id: '6R3LMkeTeRW1iD0SqQsw',
      actions: [{
        id: 0,
        icon: 'fa-users',
        link: '#',
        linkName: 'volunteer'
      }, {
        id: 1,
        icon: 'fa-money',
        link: '#',
        linkName: 'donate'
      }],
      tiles: [
        {
          id: 2,
          gauge: {
            min: 0,
            max: 4000,
            label: 'campaign',
            type: 'arch',
            value: 2430,
            append: 'dollar'
          },
          link: '#',
          linkName: 'donate to this fund',
          title: '2018 Scholarships Fund',
          image: 'https://imgur.com/aWAsWXt'
        }, {
          description: 'A gift to the Ontario 4-H Foundation is a gift for the future of 4-H in Ontario. ',
          link: '#',
          linkName: 'Donate',
          title: 'Make an impact'
        },
        {
          description: `4-H is one of the nation's longest standing positive youth development organizations.
        Each year, over 6000 youth benefit from the mentorship!`,
          link: '#',
          linkName: 'volunteer',
          title: 'Volunteers Needed!'
        }],
      organization: '4H Ontario'
    };
    this.socialGood = socialGood;
  }

  public openModal(type: string) {
    const options: any = {
      providers: [{ provide: SocialGoodContext, useValue: this.socialGood }],
      size: 'large'
    };

    const modalInstance = this.modal.open(SocialGoodFormComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        console.log('save', result.data);
        this.socialGood = result.data;
      }
      console.log(`Modal closed with reason: ${result.reason} and data: ${JSON.stringify(result.data)}`);
    });

  }

}
