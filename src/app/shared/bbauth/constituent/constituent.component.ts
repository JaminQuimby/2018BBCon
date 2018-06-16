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
  public gift: any;

  constructor(
    private constituentService: ConstituentService,
    private sessionService: BBSessionService
  ) { }

  public async getData() {
    this.constituent = await this.constituentService.getById(this.constituentId);
    this.gift = await this.constituentService.getLatestGift(this.constituentId);
  }

  public ngOnInit(): void {
    this.getData();
  }

  public logout(): void {
    this.sessionService.logout();
  }
}
