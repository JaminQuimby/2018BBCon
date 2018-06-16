import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BBSessionService } from '../../shared/bbauth/bbsession.service';
import { BBSettingsService } from '../../shared/bbauth/bbsettings.service';

export type HashPairsType<K extends string> = { [key in K]: string };

@Component({
  selector: 'bb-auth-token',
  template: ''
})
export class BBAuthTokenComponent implements OnInit {

  private hash: String;
  private hashArray: Array<String>;
  private hashPairs: HashPairsType<string> = {};

  @Input()
  public token: string;

  constructor(
    private location: Location,
    private router: Router,
    private settingsService: BBSettingsService,
    private sessionService: BBSessionService
  ) { }

  public ngOnInit(): void {

    this.hash = window.location.hash.substr(1);
    this.hashArray = this.hash.split('&');
    this.hashArray.forEach((hash) => {
      let obj = hash.split('=');

      this.hashPairs[obj[0]] = obj[1];
    });

    this.sessionService.setToken(this.hashPairs);
    this.settingsService.getConfigFile().then(() => {
      this.router.navigate(['/']);
    });
  }
}
