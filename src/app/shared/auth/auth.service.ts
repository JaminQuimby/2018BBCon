import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ProfileModel } from '../profile/profile-model';
import { AuthUserModel } from './auth.model';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  public user$: BehaviorSubject<AuthUserModel> = new BehaviorSubject({});

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.initFirebase();
    this.user = firebaseAuth.authState;
    this.user.subscribe(userObject => (userObject && this.user$.next(userObject)));
  }

  public async login_google() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    try {
      let result = await this.firebaseAuth.auth.signInWithRedirect(provider);
      console.log('Sign-in result', result);
    } catch (error) {
      console.error('Sig-in error', error);
    }
  }
  public logout() {
    this.firebaseAuth.auth.signOut();
    let user: ProfileModel = new ProfileModel();
    this.user$.next(user);
  }
  public async lookupUserBy(userUid: string): Promise<ProfileModel> {
    try {
      let user = await this.db.collection(`/users`).doc(userUid).ref.get();
      console.log('user data:', user.exists && user.data());
      sessionStorage.setItem('uid', user.data().uid);
      return user.exists && { ...new ProfileModel, ...user.data() };
    } catch (error) {
      console.log('Error getting user:', error);
      return undefined;
    }
  }

  private async initFirebase() {
    await firebase.firestore().enablePersistence();
    try {
      // Initialize Cloud Firestore through firebase
      firebase.firestore();
    } catch (error) {
      if (error.code === 'failed-precondition') {
        console.log(error.code);
      } else if (error.code === 'unimplemented') {
        console.log(error.code);
      }
    }
  }
}
