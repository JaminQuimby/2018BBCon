import { Component } from '@angular/core';
import { DonateContext } from './donate.context';
import { DonateFormComponent } from './donate-form.component';
import { Container } from '../shared/database.service';
import {
  SkyModalService,
  SkyModalCloseArgs
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'demo-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {
  @Container(`users\\$uid$\\donations`)
  private donations: DonateContext[];
  constructor(private modal: SkyModalService) { }

  public openModal(type: string) {
    const options: any = {
      providers: [{ provide: DonateContext, useValue: this.donations }],
      size: 'large'
    };

    const modalInstance = this.modal.open(DonateFormComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        console.log('save', result.data);
        this.donations = result.data;
      }
      console.log(`Modal closed with reason: ${result.reason} and data: ${JSON.stringify(result.data)}`);
    });

  }

}
