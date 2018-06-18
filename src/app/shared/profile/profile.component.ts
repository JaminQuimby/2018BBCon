import { Component } from '@angular/core';
import { ProfileModel } from './profile-model';
import { Profile } from './profile.service';

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
}
