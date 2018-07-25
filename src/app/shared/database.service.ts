import { Injectable, ReflectiveInjector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppExtrasModule } from '../app-extras.module';
import { AuthService } from './auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class DatabaseService {
  public databasesCollection: AngularFirestoreCollection<any>;
  public databaseDocument: AngularFirestoreDocument<any>;
  public databasesDocument: AngularFirestoreDocument<{}>;
  public database$: BehaviorSubject<Array<any>> = new BehaviorSubject(undefined);
  private uid: string;
  private collection: string;
  private docRef: string;
  constructor(private db: AngularFirestore, private auth: AuthService) {

  }

  public bootstrap(collection: string, docRef?: string) {

    this.auth.user$.distinctUntilChanged().subscribe((user) => {
      collection = collection && collection.replace('$uid$', user.uid);
      docRef = docRef && docRef.replace('$uid$', user.uid);
      console.log('collection', collection, 'docRef', docRef);
      this.uid = user.uid;
      this.collection = collection;
      this.docRef = docRef;

      console.log('init', this.uid);

      console.log('bootstrap', this.collection, this.docRef);
      if (this.collection) {

        this.databasesCollection = this.db.collection(`/${this.collection}/`);
        if (this.docRef) {
          this.databaseDocument = this.databasesCollection.doc(this.docRef);
          this.databaseDocument.snapshotChanges().map(action => {
            const data = action.payload.data();
            const id = action.payload.id;
            return { id, ...data };
          }).subscribe((data) => (data.id && this.updateView([data])));
        } else {
          this.databasesCollection.snapshotChanges().map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data();
              const id = action.payload.doc.id;
              return { id, ...data };
            });
          }).subscribe((data) => (data.length > 0 && this.updateView(data)));
        }

      }

    });

  }

  public database() {
    return this.database$;
  }
  public save(database: any) {
    let mutated = this.mutations(database);
    mutated.id ?
      this.databasesCollection.doc(mutated.id).update(mutated) :
      this.databasesCollection.add(mutated);
  }

  public remove(id: string) {
    this.databasesCollection.doc(id).delete();
  }

  public update(id: string, ...data: any[]) {
    let change: any = this.database$.getValue().find(database => database.id === id);
    let changes: any = { ...change, ...data };
    this.save(changes);
  }

  private mutations(database: any) {
    return database;
  }

  private updateView(database: Array<any>) {
    this.database$.next(database.reverse());
  }

}
export function Container(collection: string, docRef?: string): PropertyDecorator {
  return function (target: any, propertyKey: string) {
    // call service from here to delegate logging
    let constructor = target.constructor;
    const HOOKS = [
      'ngOnInit',
      'ngOnDestroy'
    ];
    let databaseService: DatabaseService;
    let angularFirestore: AngularFirestore;
    let authService: AuthService;
    HOOKS.forEach((hook) => {
      if (hook === 'ngOnInit') {
        const selfOnInit = constructor.prototype[hook];
        let initData: Array<any>;
        Object.defineProperty(target, propertyKey, {
          configurable: true,
          enumerable: true,
          get: () => {
            return initData;
          },
          set: (newData) => {
            initData = newData;
            console.log('setter init', newData);
          }
        });

        constructor.prototype[hook] = (...args: Array<any>) => {
          angularFirestore = AppExtrasModule.injector.get(AngularFirestore);
          authService = AppExtrasModule.injector.get(AuthService);
          const service = ReflectiveInjector.resolveAndCreate([
            DatabaseService,
            { provide: AngularFirestore, useFactory: () => angularFirestore },
            { provide: AuthService, useFactory: () => authService }
          ]);
          databaseService = service.get(DatabaseService);
          databaseService.bootstrap(collection, docRef);
          databaseService.database$.distinctUntilChanged().subscribe((model) => {
            if (model) {
              initData = Array.isArray(model) ? model : [model];
              console.log(propertyKey, target[propertyKey]);
              Object.defineProperty(target, propertyKey, {
                configurable: true,
                enumerable: true,
                get: () => {
                  return Array.isArray(model) ? model : [model];
                },
                set: (newData) => {
                  console.log('setter', newData);
                  databaseService.save(newData);
                  // databaseService.database$.next(newData);
                }
              });

            }
          });
          if (selfOnInit) { selfOnInit.apply(this, args); }
        };
      }
      if (hook === 'ngOnDestroy') {
        const selfOnDestory = constructor.prototype[hook];
        if (databaseService) {
          if (typeof selfOnDestory === 'function') { selfOnDestory(); }
          databaseService.database$.unsubscribe();
        }
      }
    });
    return databaseService;
  };
}
