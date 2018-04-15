import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from './shared/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProfileService } from './shared/profile/profile.service';
import { ProfileFormComponent } from './shared/profile/profile-form.component';
import { SkyAppBootstrapper } from '@blackbaud/skyux-builder/runtime/bootstrapper';
import { LoginModalComponent } from './shared/login/login-modal.component';

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
// Specify entry components, module-level providers, etc. here.
@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [
    AuthService,
    AngularFireAuth,
    ProfileService
  ],
  entryComponents: [
    ProfileFormComponent,
    LoginModalComponent
  ]
})
export class AppExtrasModule { }
