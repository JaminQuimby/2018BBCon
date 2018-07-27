import { BlockchainService } from './blockchain.service';
import { DonationBlock } from './donationBlock';
import { Injectable } from '@angular/core';
import { MetricModel } from '../shared/metric-block-widget/metric-block-widget.model';
import { Subject } from 'rxjs/Subject';
@Injectable()

export class DonationBlockService {

  public contract: any;
  public account: any;
  public donation: Subject<MetricModel> = new Subject();
  constructor(private blockchainService: BlockchainService) {
    this._donation();
  }

  public async setDonationBlock(args: DonationBlock) {
    const contract = this.contract;
    const account = this.account;
    console.log('give a gift', account, args.to);
    const isDonation = await contract.methods.isDonation(account).call();
    const dimension = this.blockchainService.stringToHex(args.dimension);
    let donation = isDonation ?
      contract.methods.updateMetric(args.to, args.metric) :
      contract.methods.insertDonation(args.to, dimension, args.metric);
    console.log('from', account);
    donation
      .send({ 'from': account })
      .then((receipt: any) => {
        console.log('receipt', receipt);
      });
  }

  private async _donation() {
    this.account = await this.blockchainService.account();
    this.contract = await this.blockchainService.getContract('Donation').toPromise();
    const count = await this.contract.methods.getUserCount().call();

    if (parseInt(count, 10) <= 1) {
      console.warn('there are no donations, reset MetaMask');

      this.setDonationBlock({ dimension: 'dollars', metric: 1 });
    } else {
      // this.setDonationBlock({ dimension: 'dollars', metric: -438 });
      let getDonation: MetricModel = await this.contract.methods.getDonation(this.account).call({ 'from': this.account });
      getDonation.dimension = this.blockchainService.hexToString(getDonation.dimension);
      console.log('testing await donation', getDonation, 'contract', this.contract);
      getDonation.message = 'in donations';
      getDonation.linkName = 'more info';
      this.donation.next(getDonation);
    }
  }
}
