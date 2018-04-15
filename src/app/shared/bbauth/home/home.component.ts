import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../shared/session.service';

@Component({
  selector: 'auth-home',
  template: require('./home.component.html')
})
export class HomeComponent implements OnInit {
  /**
  *  Defines our public variable isAuthenticated to use as part of the *ngIf
  *  in our template. We give this variable a type of boolean so we know what
  *  type of value is assigned.
  */
  public isAuthenticated: boolean;

  /**
  *  Pulls in and creates our sessionService based on the SessionService class that we imported.
  */
  constructor(
    private sessionService: SessionService) { }

  /**
  *  On initialization, calls the sessionService we created in our constructor and uses
  *  its isAuthenticated method. This method returns a boolean value based on whether
  *  users are logged in or not. It then assigns that returned boolean to the public isAuthenticated
  *  variable that we defined above.
  */
  public ngOnInit(): void {
    this.isAuthenticated = this.sessionService.isAuthenticated();
  }
}
