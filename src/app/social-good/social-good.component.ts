import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  styleUrls: ['./social-good.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialGoodComponent {
  @Container(`users/$uid$/social-good`)
  public socialGood: SocialGoodContext | SocialGoodContext[];

  constructor(private modal: SkyModalService) { }

  public somePlace() {
    const socialGood = {
      action: 'click me',
      background: '~assets/images/hands.png',
      description: 'my description',
      link: '#',
      organization: 'Good Org',
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
