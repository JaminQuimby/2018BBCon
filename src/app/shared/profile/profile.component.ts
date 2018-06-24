import { Component } from '@angular/core';
import { ProfileModel } from './profile-model';
import { MetricModel } from '../metric-block-widget/metric-block-widget';

import { Container } from '../database.service';
import {
  SkyModalService,
  SkyModalCloseArgs
} from '@blackbaud/skyux/dist/core';
import { ProfileFormContext } from './profile-form.context';
import { ProfileFormComponent } from './profile-form.component';

@Component({
  selector: 'demo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent {
  @Container(`users`)
  private profile: ProfileModel[];

  constructor(private modal: SkyModalService) { }

  public get displayName() { return this.profile[0] && this.profile[0].displayName; }
  public get email() { return this.profile[0] && this.profile[0].email; }
  public get photoURL() { return this.profile[0] && this.profile[0].photoURL; }
  public get metricModel(): MetricModel {
    return {
      metric: '100',
      metricPrefix: '$',
      dimension: 'dollars',
      message: 'to your cause',
      linkName: 'next events',
      linkAddress: '#'

    };
  }

  public openModal(type: string) {
    const context = new ProfileFormContext();
    const options: any = {
      providers: [{ provide: ProfileFormContext, useValue: { ...context, ...this.profile[0] } }],
      size: 'large'
    };

    const modalInstance = this.modal.open(ProfileFormComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        console.log('save', result.data);
        this.profile = result.data;
      }
      console.log(`Modal closed with reason: ${result.reason} and data: ${JSON.stringify(result.data)}`);
    });

  }
}
