export class SocialGoodContext {
  public action: string;
  public actions?: SocialGoodActions[];
  public tiles: SocialGoodTiles[];
  public background: string;
  public id?: string;
  public organization: string;
  public gauge?: SocialGoodGauge;
}

export class SocialGoodTiles {
  public description: string;
  public link: string;
  public linkName?: string = 'more info';
  public title: string;
  public id?: number;
}

export class SocialGoodActions {
  public icon: string;
  public link: string;
  public linkName?: string = 'volunteer';
  public id?: number;
}

export class SocialGoodGauge {
  public type: 'full' | 'semi' | 'arch';
  public value: number;
  public append: string;
  public label: string;
}
