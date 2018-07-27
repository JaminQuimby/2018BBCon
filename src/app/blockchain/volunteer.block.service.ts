import { BlockchainService } from './blockchain.service';
import { VolunteerBlock } from './volunteerBlock';
import { Injectable } from '@angular/core';
import { MetricModel } from '../shared/metric-block-widget/metric-block-widget.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
@Injectable()

export class VolunteerBlockService {

  public account: any;
  public contract: any;
  public volunteer: Subject<MetricModel> = new Subject();
  constructor(private blockchainService: BlockchainService) {
    this._volunteer();
    Observable.timer(10000, 10000)
      .subscribe(() => this._volunteer());
  }

  public async setVolunteerBlock(args: VolunteerBlock) {
    const contract = this.contract;
    const account = this.account;
    console.log('give hours', account, args.to);
    const isVolunteer = await this.contract.methods.isVolunteer(account).call();
    const dimension = this.blockchainService.stringToHex(args.dimension);
    let hours = isVolunteer ?
      contract.methods.updateMetric(args.to, args.metric) :
      contract.methods.insertVolunteer(args.to, dimension, args.metric);
    console.log('from', account);
    hours
      .send({ 'from': account })
      .then((receipt: any) => {
        console.log('receipt', receipt);
      });
  }

  public async _volunteer() {
    this.account = await this.blockchainService.account();
    this.contract = await this.blockchainService.getContract('Volunteer').toPromise();
    const count = await this.contract.methods.getUserCount().call();
    if (parseInt(count, 10) <= 0) {
      console.warn('there are no volunteers reset MetaMask');
      this.setVolunteerBlock({ dimension: 'hours', metric: 1 });
    } else {
      let getVolunteer: MetricModel = await this.contract.methods.getVolunteer(this.account).call({ 'from': this.account });
      getVolunteer.dimension = this.blockchainService.hexToString(getVolunteer.dimension);
      console.log('testing await volunteers', getVolunteer, 'contract', this.contract);
      getVolunteer.message = 'of service';
      getVolunteer.linkName = 'more info';
      this.volunteer.next(getVolunteer);
    }
  }
}
