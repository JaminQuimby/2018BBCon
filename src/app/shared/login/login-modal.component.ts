import { Component } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/core';
import { AuthService } from '../../shared/auth/auth.service';
import { ProfileService } from '../../shared/profile/profile.service';
import { UserModel } from '../../shared/user/user.model';

@Component({
  selector: 'demo-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['login-modal.component.scss']
})
export class LoginModalComponent {
  public email: string;
  public password: string;
  public model: UserModel;

  constructor(
    public instance: SkyModalInstance,
    private auth: AuthService,
    public profile: ProfileService) {

    this.profile.user$.subscribe((user) => {
      this.model = user;
    });
  }

  public login_google() {
    this.auth.login_google();
    this.email = this.password = '';
  }

  public logout() {
    this.auth.logout();
  }

  public get uid(){
    return this.model.uid;
  }
}
