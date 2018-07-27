import { Component } from '@angular/core';

@Component({
  selector: 'uapi-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent {
  public  utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  constructor() { }

  public days_between(date1 = new Date(this.utc), date2 = new Date('2018-12-24')) {

    // The number of milliseconds in one day
    let ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    let date1ms = date1.getTime();
    let date2ms = date2.getTime();

    // Calculate the difference in milliseconds
    let differencems = Math.abs(date1ms - date2ms);

    // Convert back to days and return
    return Math.round(differencems / ONE_DAY);

  }
}
