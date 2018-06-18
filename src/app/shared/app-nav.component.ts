import { Component } from '@angular/core';
import { Profile } from '../shared/profile/profile.service';
import { ProfileModel } from '../shared/profile/profile-model';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['app-nav.component.scss']
})

export class AppNavComponent {
  @Profile()
  private profile: ProfileModel;
  public nav = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Dashboard',
      path: '/dashboard'
    }
  ];

  public displayName() { return this.profile.displayName; }
  public photoURL() { return this.profile.photoURL; }

}
