import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from './shared/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { ProfileService } from './shared/profile/profile.service';
import { ProfileFormComponent } from './shared/profile/profile-form.component';
import { MetricBlockWidgetComponent } from './shared/metric-block-widget/metric-block-widget.component';

import { SkyAppBootstrapper } from '@blackbaud/skyux-builder/runtime/bootstrapper';
import { LoginModalComponent } from './shared/login/login-modal.component';

// Blackbaud Integration
import { BBHomeComponent } from './shared/bbauth/home/home.component';
import { BBSessionService } from './shared/bbauth/bbsession.service';
import { BBSettingsService } from './shared/bbauth/bbsettings.service';

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
  AuthService,
  AngularFireAuth,
  ProfileService,
  BBSessionService,
  BBSettingsService
];

const modules = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  AngularFirestoreModule,
  FormsModule,
  ReactiveFormsModule
];

const components = [
  ProfileFormComponent,
  MetricBlockWidgetComponent,
  LoginModalComponent,
  BBHomeComponent
];

@NgModule({
  imports: modules,
  exports: [],
  providers: services,
  entryComponents: components
})
export class AppExtrasModule {
  public static injector: Injector;

  constructor(private injector: Injector) {
    AppExtrasModule.injector = this.injector;
  }
}
