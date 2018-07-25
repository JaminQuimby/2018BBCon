import { Component, Input } from '@angular/core';
import { SocialGoodContext } from './social-good.context';

@Component({
  selector: 'social-good-card',
  templateUrl: './social-good-card.component.html',
  styleUrls: ['./social-good-card.component.scss']
})
export class SocialGoodCardComponent {
  @Input()
  public socialGoodCard: SocialGoodContext;
  constructor() { }

  public get organization() { return this.socialGoodCard.organization; }
  public get tiles() { return this.socialGoodCard.tiles; }
  public get actions() { return this.socialGoodCard.actions; }
  public get background() { return `url(${this.socialGoodCard.background})`; }
  public get action() { return this.socialGoodCard.action; }

}
