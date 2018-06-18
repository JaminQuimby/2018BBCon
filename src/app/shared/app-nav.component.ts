import { Component } from '@angular/core';
import { Profile } from '../shared/profile/profile.service';
import { UserModel } from './user/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['app-nav.component.scss']
})

export class AppNavComponent {
  @Profile()
  public profile: UserModel;
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
  constructor() { }

}
