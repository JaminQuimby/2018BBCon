import { Component } from '@angular/core';
import { UserModel } from '../user/user.model';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'uapi-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  private user: UserModel;
  constructor(
    public profile: ProfileService) {
    this.profile.user$.subscribe((user) => {
      this.user = user;
    });
  }

}
