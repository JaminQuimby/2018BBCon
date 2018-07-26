import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AchievementModel } from './achievement-block-widget.model';
import { Container } from '../database.service';

@Component({
  selector: 'achievement-block-widget',
  templateUrl: './achievement-block-widget.component.html',
  styleUrls: ['./achievement-block-widget.component.scss']
})
export class AchievementBlockWidgetComponent {
  @Container(`users/$uid$/achievements`)
  public achievementsModel: AchievementModel | AchievementModel[];
  constructor() { }

  public get achievements() {
    return this.achievementsModel;
  }
  public background(image: string) { return `url(${image})`; }
}
