import { Component } from '@angular/core';
import { ProfileModel } from './profile-model';
import { Profile } from './profile.service';
import { MetricModel } from '../metric-block-widget/metric-block-widget';
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
  @Profile()
  private profile: ProfileModel;

  constructor(private modal: SkyModalService) { }

  public get displayName() { return this.profile.displayName; }
  public get email() { return this.profile.email; }
  public get photoURL() { return this.profile.photoURL; }
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
    context.valueA = 'Hello';

    const options: any = {
      providers: [{ provide: ProfileFormContext, useValue: context }],
      size: 'large'
    };

    const modalInstance = this.modal.open(ProfileFormComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      console.log(`Modal closed with reason: ${result.reason} and data: ${result.data}`);
    });

    modalInstance.helpOpened.subscribe((helpKey: string) => {
      context.eventMessage = `
        Modal header help was invoked with the following help key: ${helpKey}
      `;
    });
  }
}
