// Firebase Integration
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

// App
import { AuthService } from './shared/auth/auth.service';
import { DatabaseService } from './shared/database.service';
import { SocialGoodComponent } from './social-good/social-good.component';
import { SocialGoodFormComponent } from './social-good/social-good-form.component';
import { LoginModalComponent } from './shared/login/login-modal.component';
import { MetricBlockWidgetComponent } from './shared/metric-block-widget/metric-block-widget.component';
import { GaugeBlockWidgetComponent } from './shared/gauge-block-widget/gauge-block-widget.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { ProfileFormComponent } from './shared/profile/profile-form.component';
import { SocialGoodCardComponent } from './social-good/social-good-card.component';

// Core
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { SkyAppBootstrapper } from '@blackbaud/skyux-builder/runtime/bootstrapper';
import { NgxGaugeModule } from 'ngx-gauge';

// Blackbaud Integration
import { BBHomeComponent } from './shared/bbauth/home/home.component';
import { BBSessionService } from './shared/bbauth/bbsession.service';
import { BBSettingsService } from './shared/bbauth/bbsettings.service';

// Blockchain Intergration
import { BlockchainService } from './blockchain/blockchain.service';
import { VolunteerBlockService } from './blockchain/volunteer.block.service';
import { DonationBlockService } from './blockchain/donation.block.service';

(SkyAppBootstrapper as any).processBootstrapConfig = () => {
  return new Promise((resolve, reject) => {
    //  reject(false);
    resolve(true);

  });
};

const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBNdWA9XDRcBDGNx0LZYDyaSiCpLo4GPHQ',
    authDomain: 'bbcon-b0197.firebaseapp.com',
    databaseURL: 'https://bbcon-b0197.firebaseio.com',
    projectId: 'bbcon-b0197',
    storageBucket: 'bbcon-b0197.appspot.com',
    messagingSenderId: '101575878803'
  }
};

const services = [
  AngularFireAuth,
  AuthService,
  BlockchainService,
  DonationBlockService,
  VolunteerBlockService,
  BBSessionService,
  BBSettingsService,
  DatabaseService
];

const modules = [
  AngularFireDatabaseModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserModule,
  NgxGaugeModule
];

const components = [
  BBHomeComponent,
  SocialGoodComponent,
  SocialGoodFormComponent,
  SocialGoodCardComponent,
  LoginModalComponent,
  MetricBlockWidgetComponent,
  GaugeBlockWidgetComponent,
  ProfileComponent,
  ProfileFormComponent
];

@NgModule({
  entryComponents: components,
  exports: [NgxGaugeModule],
  imports: modules,
  providers: services
})
export class AppExtrasModule {
  public static injector: Injector;
  constructor(private injector: Injector, private db: AngularFirestore) {
    this.db.firestore.settings({ timestampsInSnapshots: true });
    this.db.firestore.enablePersistence();
    AppExtrasModule.injector = this.injector;

  }
}
