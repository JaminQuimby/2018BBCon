// Firebase Integration
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// App
import { AuthService } from './shared/auth/auth.service';
import { LoginModalComponent } from './shared/login/login-modal.component';
import { MetricBlockWidgetComponent } from './shared/metric-block-widget/metric-block-widget.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { ProfileFormComponent } from './shared/profile/profile-form.component';
import { ProfileService } from './shared/profile/profile.service';
import { DatabaseService } from './shared/database.service';

// Core
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { SkyAppBootstrapper } from '@blackbaud/skyux-builder/runtime/bootstrapper';

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
  AngularFireAuth,
  AuthService,
  BBSessionService,
  BBSettingsService,
  ProfileService,
  DatabaseService
];

const modules = [
  AngularFireDatabaseModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule,
  FormsModule,
  ReactiveFormsModule
];

const components = [
  BBHomeComponent,
  LoginModalComponent,
  MetricBlockWidgetComponent,
  ProfileComponent,
  ProfileFormComponent
];

@NgModule({
  entryComponents: components,
  exports: [],
  imports: modules,
  providers: services
})
export class AppExtrasModule {
  public static injector: Injector;

  constructor(private injector: Injector) {
    AppExtrasModule.injector = this.injector;
  }
}
