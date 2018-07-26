
declare let require: any;
declare let window: any;
import { SkyAppConfig } from '@blackbaud/skyux-builder/runtime';
import { SkyAppAssetsService } from '@blackbaud/skyux-builder/runtime';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as W3 from 'web3';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
const Web3 = require('web3'); // tslint:disable-line
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/defer';
@Injectable()

export class BlockchainService {
  private web3: W3.default;  // tslint:disable-line
  public account$: BehaviorSubject<string> = new BehaviorSubject(undefined);
  public balance$: BehaviorSubject<number> = new BehaviorSubject(undefined);
  public app: any;

  constructor(
    private http: Http,
    private readonly assets: SkyAppAssetsService,
    private readonly skyAppConfig: SkyAppConfig
  ) {
    this.app = this.skyAppConfig.skyux.appSettings.blockchain;
    this.web3 = new Web3(Web3.givenProvider || this.app.provider);
    this.initAccount();
  }
  public getContract(contractName: string): Observable<any> {
    const blockABI = this.assets.getUrl(`${contractName}Block.json`);
    return Observable.defer(async () => {
      let abi: any;
      let contracts: any[] = [];
      let block = await this.http.get(blockABI).toPromise()
        .then(res => {

          contracts.push(res.json());
          abi = contracts
            .find((contract: any) => contract.contractName === `${contractName}Block`).abi;
          const blockAddress = this.app.contracts[contractName.toLowerCase()];
          const contract = new this.web3.eth.Contract(abi, blockAddress);
          return contract;
        });
      return block;
    });
  }

  public hexToString(hex: any) {
    if (hex) {
      return this.web3.utils.hexToString(hex);
    }
    return '';
  }
  public stringToHex(str: string) {
    if (str) {
      return this.web3.utils.stringToHex(str);
    }
    return '';
  }

  private async initAccount() {
    const account = await this.web3.eth.getCoinbase();
    this.account$.next(account);
  }

  private async initBalance() {
    const account = this.account$.getValue();
    const balance = await this.web3.eth.getBalance(account);
    this.balance$.next(balance);
  }

}
