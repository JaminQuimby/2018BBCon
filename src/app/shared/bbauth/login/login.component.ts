import { Component } from '@angular/core';
import { SessionService } from '../../shared/session.service';

@Component({
  selector: 'login',
  template: require('./login.component.html'),
  styles: [`button {
    margin-top: 10px;
  }`]
})
export class LoginComponent {
  constructor (
    private sessionService: SessionService
  ) {}

  private loggedIn(): boolean {
    return this.sessionService.isAuthenticated();
  }

  private login(): void {
    this.sessionService.login();
  }

  private logout(): void {
    this.sessionService.logout();
  }
}
