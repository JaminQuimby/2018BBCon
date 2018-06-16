import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../shared/auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DatabasesService {
  public databasesCollection: AngularFirestoreCollection<any>;
  public database$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  private db: AngularFirestore;
  @Inject(AuthService)
  private auth: AuthService;

  constructor(private url: string) { }
 /*
 * *
 * *
 * *
 * * FILE USE FOR EXAMPLE
 * *
 * *
 * *
 * */
  public start() {
    /*
        this.auth.org$.subscribe((org: any) => {
          let collectionUrl = `/organizations/${org.id}/${this.url}/`;
          this.databasesCollection = this.db.collection(collectionUrl);
          this.databasesCollection
            .snapshotChanges().map(actions => {
              return actions.map(action => {
                const data = action.payload.doc.data();
                const id = action.payload.doc.id;
                return { id, ...data };
              });
            }).subscribe((data) => (data.length > 0 && this.updateView(data)));
        });
    */
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
    let tags: Array<string> = [];
    if (database.tags) {
      database.tags.toString().split(',')
        .forEach((tag: any) => (tags.push(tag)));
    }
    database.tags = tags;
    return database;
  }
  /*
    private updateView(database: Array<any>) {
      this.database$.next(database.reverse());
    }
    */
}
