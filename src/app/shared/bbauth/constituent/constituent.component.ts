import { Component, OnInit } from '@angular/core';
import { ConstituentService } from './constituent.service';
import { BBSessionService } from '../bbsession.service';

@Component({
  selector: 'bb-constituent',
  template: require('./constituent.component.html'),
  providers: [ConstituentService]
})
export class ConstituentComponent implements OnInit {
  private constituentId: number = 1098;
  public constituent: any;
  public volunteer: any;

  constructor(
    private constituentService: ConstituentService,
    private sessionService: BBSessionService
  ) { }

  public async getData() {
    this.constituent = await this.constituentService.getById(this.constituentId);
    this.volunteer = await this.constituentService.getLatestVolunteer(this.constituentId);
  }

  public ngOnInit(): void {
    this.getData();
  }

  public logout(): void {
    this.sessionService.logout();
  }
}
