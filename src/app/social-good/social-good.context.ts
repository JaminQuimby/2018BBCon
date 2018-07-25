export class SocialGoodContext {
  public action: string;
  public actions?: SocialGoodActions[];
  public tiles: SocialGoodTiles[];
  public background: string;
  public id?: string;
  public organization: string;
}

export class SocialGoodTiles {
  public description?: string;
  public link: string;
  public linkName?: string = 'more info';
  public title: string;
  public gauge?: SocialGoodGauge;
}

export class SocialGoodActions {
  public icon: string;
  public link: string;
  public linkName?: string = 'volunteer';
}

export class SocialGoodGauge {
  public min: number = 0;
  public max: number = 100;
  public type: string;
  public value: number;
  public append: string;
  public label: string;
}
