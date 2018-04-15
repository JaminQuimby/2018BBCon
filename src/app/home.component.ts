import { Component } from '@angular/core';
import {
  SkyModalService,
  SkyModalCloseArgs
} from '@blackbaud/skyux/dist/core';

import { LoginModalComponent } from './shared/login/login-modal.component';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  constructor(
    private modal: SkyModalService
  ) { }

  public openModal() {

    const options: any = {
      ariaDescribedBy: 'docs-modal-content'
    };

    const modalInstance = this.modal.open(LoginModalComponent, options);

    modalInstance.closed.take(1).subscribe((result: SkyModalCloseArgs) => {
      console.log(`Modal closed with reason: ${result.reason} and data: ${result.data}`);
    });

  }

}
