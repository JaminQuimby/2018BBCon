import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppExtrasModule } from '../app-extras.module';

@Injectable()
export class DatabaseService {
  public databasesCollection: AngularFirestoreCollection<any>;
  public databaseDocument: AngularFirestoreDocument<any>;
  public databasesDocument: AngularFirestoreDocument<{}>;
  public database$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  constructor(private db: AngularFirestore) { }

  public bootstrap(collection: string, ref?: string) {
    if (collection) {
      this.databasesCollection = this.db.collection(`/${collection}/`);
      if (ref) {
        this.databaseDocument = this.databasesCollection.doc(ref);
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
    HOOKS.forEach((hook) => {
      if (hook === 'ngOnInit') {
        const selfOnInit = constructor.prototype[hook];
        constructor.prototype[hook] = () => {
          databaseService = AppExtrasModule.injector.get(DatabaseService);
          collection = collection && collection.replace('$uid$', sessionStorage.getItem('uid'));
          docRef = docRef && docRef.replace('$uid$', sessionStorage.getItem('uid'));
          databaseService.bootstrap(collection, docRef);
          databaseService.database$.subscribe((model) => {
            console.log('database subscribe', model);
            Object.defineProperty(target, propertyKey, {
              configurable: true,
              enumerable: true,
              get: () => model,
              set: (newData) => {
                databaseService.save(newData);
                databaseService.database$.next(newData);
              }
            });
          });
          if (typeof selfOnInit === 'function') { selfOnInit(); }
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
