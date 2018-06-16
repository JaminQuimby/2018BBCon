import { Component, OnInit } from '@angular/core';
import { BBSessionService } from '../bbsession.service';

@Component({
  selector: 'bb-home',
  template: require('./home.component.html')
})
export class BBHomeComponent implements OnInit {
  public isAuthenticated: boolean;
  constructor(
    private sessionService: BBSessionService
  ) { }

  public ngOnInit(): void {
    this.isAuthenticated = this.sessionService.isAuthenticated();
  }
}
