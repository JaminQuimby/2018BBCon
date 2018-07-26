
import { BlockchainService } from './blockchain.service';
import { DonationBlock } from './donationBlock';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class DonationBlockService {
  public block$: Subject<DonationBlock> = new Subject();
  public contract: any;
  public account: any;
  public donation: any;
  constructor(private blockchainService: BlockchainService) {
    this.bootstrap();
  }

  public async setDonationBlock(args: DonationBlock) {
    const contract = this.contract;
    const account = this.account;
    const isDonation = await contract.methods.isDonation(account).call();
    const dimension = this.blockchainService.stringToHex(args.dimension);
    let donation = isDonation ?
      contract.methods.updateMetric(account, args.metric) :
      contract.methods.insertDonation(account, dimension, args.metric);
    console.log('from', account);
    donation
      .send({ 'from': account })
      .then((receipt: any) => {
        console.log('receipt', receipt);
      });
  }

  private async bootstrap() {
    this.blockchainService.account$.take(2).subscribe(async (account) => {
      this.account = account;
      if (account) {
        this.contract = await this.blockchainService.getContract('Donation').toPromise();
        const count = await this.contract.methods.getUserCount().call();
        if (parseInt(count, 10) <= 0) {
          console.warn('there are no donations, reset MetaMask');
          this.setDonationBlock({ dimension: 'dollars', metric: 1 });
        } else {
          this.donation = await this.contract.methods.getDonation(this.account).call({ 'from': this.account });
          console.log('testing await donation', this.donation, 'contract', this.contract);
        }
        const block = {
          ...{ dimension: '', metric: 0 },
          ...this.donation
        };
        this.block$.next(block);
      }
    });

  }
}
