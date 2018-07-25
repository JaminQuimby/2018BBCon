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
      id: 'E19JFkaIL9nIpvoXgDbr',
      actions: [{
        id: 0,
        icon: 'fa-users',
        link: '#',
        linkName: 'volunteer'
      }, {
        id: 1,
        icon: 'fa-gift',
        link: '#',
        linkName: 'bones'
      }],
      tiles: [{
        id: 0,
        description: 'Bark, bark, bark! Biscuits are important, the most beneficial treat of the day. Please send us biscuits. Weeee.',
        link: '#',
        linkName: 'give a dog a biscuit',
        title: 'Bark! low on biscuits!'
      },
      {
        id: 1,
        description: `Do you like dogs? Drop by the shelter at any time to walk a furry friend.
        What better way to spend a lunch then with a snack and exersize.`,
        link: '#',
        linkName: 'volunteer',
        title: 'Dog walkers needed.'
      }, {
        id: 2,
        gauge: {
          label: '2018 Walk-a-thon',
          type: 'arch',
          value: 432,
          append: 'miles'
        },
        link: '#',
        linkName: 'join us',
        title: '2018 Walk-a-thon!'
      }],
      organization: 'give a dog a biscuit. org',
      title: 'My title'
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
