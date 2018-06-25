import { Component } from '@angular/core';
import { SkyModalInstance } from '@blackbaud/skyux/dist/core';
import { AuthService } from '../../shared/auth/auth.service';
import { ProfileModel } from '../../shared/profile/profile-model';
import { Container } from '../database.service';

@Component({
  selector: 'demo-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['login-modal.component.scss']
})
export class LoginModalComponent {
  public email: string;
  public password: string;

  @Container(`users`)
  private profile: ProfileModel[];

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

  public get uid() {
    return sessionStorage.getItem('uid');
  }
}
