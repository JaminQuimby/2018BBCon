import { BlockchainService } from './blockchain.service';
import { VolunteerBlock } from './volunteerBlock';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class VolunteerBlockService {
  public block$: Subject<VolunteerBlock> = new Subject();
  public account: any;
  public contract: any;
  public volunteer: any;

  constructor(private blockchainService: BlockchainService) {
    this.bootstrap();
    //  this.setVolunteerBlock(account, { dimension: 'hours', metric: 15 });
  }

  public async setVolunteerBlock(args: VolunteerBlock) {
    const contract = this.contract;
    const account = this.account;
    const isVolunteer = await this.contract.methods.isVolunteer(account).call();
    const dimension = this.blockchainService.stringToHex(args.dimension);
    let hours = isVolunteer ?
      contract.methods.updateMetric(account, args.metric) :
      contract.methods.insertVolunteer(account, dimension, args.metric);
    console.log('from', account);
    hours
      .send({ 'from': account })
      .then((receipt: any) => {
        console.log('receipt', receipt);
      });
  }

  private bootstrap() {
    this.account = this.blockchainService.account$.take(2).subscribe(async (account) => {
      this.account = account;
      if (account) {
        this.contract = await this.blockchainService.getContract('Volunteer').toPromise();
        const count = await this.contract.methods.getUserCount().call();
        if (parseInt(count, 10) <= 0) {
          console.warn('there are no volunteers reset MetaMask');
          this.setVolunteerBlock({ dimension: 'hours', metric: 1 });
        } else {
          // this.setVolunteerBlock({ dimension: 'hours', metric: 30 });
          this.volunteer = await this.contract.methods.getVolunteer(this.account).call({ 'from': this.account });
          console.log('testing await volunteers', this.volunteer, 'contract', this.contract);
        }
        const block = {
          ...{ dimension: '', metric: 0 },
          ...this.volunteer
        };
        this.block$.next(block);
      }
    });
  }

}
