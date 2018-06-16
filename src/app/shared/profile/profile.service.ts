import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserModel } from '../user/user.model';
import { AppExtrasModule } from '../../app-extras.module';

@Injectable()
export class ProfileService {
  public context$: BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel());

  constructor(
    private authService: AuthService,
    private db: AngularFirestore
  ) {
    this.authService.user$.subscribe((user: UserModel) => user.uid && this.lookupUser(user));
  }

  private async lookupUser(user: UserModel) {
    this.context$.next(await this.authService.lookupUserBy(user.uid));
  }

  /*
  private loadUserProfile(lookupUser: UserModel, data: UserModel) {
    console.log(lookupUser);

    if (lookupUser) {
      this.user$.next(lookupUser);
    } else {
      this.user$.next({ 'role': 'admin', ...data });
      this.db.collection(`/users`).doc(data.uid)
        .set({ ...this.user$.getValue() });
    }
  }
  */
}
export function Profile(): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    // call service from here to delegate logging
    let constructor = target.constructor;
    const HOOKS = [
      'ngOnInit',
      'ngOnDestroy'
    ];
    let profileService: ProfileService;
    HOOKS.forEach((hook) => {
      constructor.prototype[hook] = () => {
        profileService = AppExtrasModule.injector.get(ProfileService);
        profileService.context$.subscribe((model) => {
          Object.defineProperty(target, propertyKey, {
            configurable: false,
            get: () => model
          });
        });
      };
    });
    return profileService;
  };
}

export function decorateClass(target: any, propertyKey: string) {
  // call service from here to delegate logging
  let constructor = target.constructor;
  const HOOKS = [
    'ngOnInit',
    'ngOnDestroy'
  ];
  let profileService: ProfileService;
  HOOKS.forEach((hook) => {
    constructor.prototype[hook] = function () {
      profileService = AppExtrasModule.injector.get(ProfileService);
      profileService.context$.subscribe((model) => {
        Object.defineProperty(target, propertyKey, {
          configurable: false,
          get: () => model
        });
      });
    };
  });
  return profileService;
}
