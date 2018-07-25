import {
  Component
} from '@angular/core';
import { ProfileModel } from './profile-model';
import { MetricModel } from '../metric-block-widget/metric-block-widget.model';
import { VolunteerBlockService } from '../../blockchain/volunteer.block.service';
import { DonationBlockService } from '../../blockchain/donation.block.service';
import { BlockchainService } from '../../blockchain/blockchain.service';
import { Container } from '../database.service';
import {
  SkyModalService,
  SkyModalCloseArgs
} from '@blackbaud/skyux/dist/core';
import { ProfileFormContext } from './profile-form.context';
import { ProfileFormComponent } from './profile-form.component';
import { DatabaseService } from '../database.service';
import 'rxjs/add/observable/from';

@Component({
  selector: 'demo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent {

  @Container(`users`, '$uid$')
  private profile: ProfileModel[] = [new ProfileModel];

  private volunteer: MetricModel = new MetricModel();
  private donation: MetricModel = new MetricModel();

  constructor(
    private db: DatabaseService,
    private modal: SkyModalService,
    private blockchainService: BlockchainService,
    private volunteerService: VolunteerBlockService,
    private donationService: DonationBlockService
  ) {
    this.donationService.block$.subscribe((block) => {
      this.donation.metric = block.metric;
      this.donation.dimension = block.dimension;
    });
    this.volunteerService.block$.subscribe((block) => {
      this.volunteer.metric = block.metric;
      this.volunteer.dimension = block.dimension;
    });
  }

  public get displayName() { return this.profile[0].displayName; }
  public get email() { return this.profile[0].email; }
  public get photoURL() { return this.profile[0].photoURL; }
  public get volunteerModel(): MetricModel {
    return {
      metric: this.volunteer.metric,
      metricPrefix: '',
      dimension: this.blockchainService.hexToString(this.volunteer.dimension),
      message: 'of service'
    };
  }

  public get donationModel(): MetricModel {
    return {
      metric: this.donation.metric,
      metricPrefix: '',
      dimension: this.blockchainService.hexToString(this.donation.dimension),
      message: 'in donations'
    };
  }

  public openModal(type: string) {
    const context = new ProfileFormContext();
    const options: any = {
      providers: [{ provide: ProfileFormContext, useValue: { ...context, ...this.profile[0] } }],
      size: 'large'
    };

    const modalInstance = this.modal.open(ProfileFormComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        console.log('save', result.data);
        this.profile = result.data;
      }
      console.log(`Modal closed with reason: ${result.reason} and data: ${JSON.stringify(result.data)}`);
    });

  }
}
