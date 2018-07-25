import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'demo-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['login-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent {
  public email: string;
  public password: string;

  constructor(
    private instance: SkyModalInstance,
    private auth: AuthService
  ) { }

  public login_google() {
    this.auth.login_google();
    this.email = this.password = '';
  }

  public save() {
    this.instance.save();
  }

  public logout() {
    this.auth.logout();
  }

}
