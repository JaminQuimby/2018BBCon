import { Component } from '@angular/core';
import { ProfileModel } from './profile-model';
import { Profile } from './profile.service';
import { MetricModel } from '../metric-block-widget/metric-block-widget';
@Component({
  selector: 'demo-profile',
  templateUrl: './profile-form.component.html',
  styleUrls: ['profile-form.component.scss']
})

export class ProfileComponent {
  @Profile()
  private profile: ProfileModel;
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
}
