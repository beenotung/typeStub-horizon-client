// Source: https://raw.githubusercontent.com/beenotung/typed-horizon/master/src/main.d.ts

import {Observable} from "rxjs/Observable";

export interface Horizon {
  (param?: HorizonConstructorParam): Horizon;

  find<A>(): Observable<A>;

  /**@deprecated*/
  call<A>(_this: Horizon, table: string): TableObject<A>;

  <A> (name: string): TableObject<A>;

  currentUser(): TableQuery<any>;

  hasAuthToken(): boolean;

  connect(): void;

  onReady(f: Function): void;

  onDisconnected(f: Function): void;

  onSocketError(f: (error: any) => void): void;

  model<A>(query: (id: string) => AggregateObject): (id: string) => FinalQuery<A>;

  aggregate<A>(query: { [key: string]: DataType | FinalQuery<OldRecord> | FindQuery<A> }): FinalQuery<A>;
}

export interface HorizonConstructorParam {
  host?: string;        // default to window.location
  secure?: boolean;     // default to true
  path?: string;        // default to "horizon"
  lazyWrites?: boolean; // default to false
  authType?: AuthType;  // default to "unauthenticated"
}

export interface HorizonConstructor {
  new(param?: HorizonConstructorParam): Horizon;

  clearAuthToken(): void;
}

export let Horizon: HorizonConstructor;

export type AuthType = "unauthenticated" | "anonymous" | "token";
export type AuthToken = { token: any, storeLocally: boolean };
export type OrderType = "ascending" | "descending";
export type RangeType = "closed" | "open";

export interface LimitedFinalQuery<A> {
  fetch(): Observable<A[]>;

  watch(): Observable<A[]>;
}

export interface FinalQuery<A> extends LimitedFinalQuery<A> {
  limit(max: number): LimitedFinalQuery<A>;
}

export interface TableQuery<A> extends FinalQuery<A> {
  order(field: string, direction?: OrderType): OrderQuery<A>;     // default to "ascending"
  above(idOrObject: string | { [key: string]: DataType }, type?: RangeType): OrderQuery<A>; // default to "open" (exclusive)
}

export interface SingleFinalQuery<A> extends Observable<A> {
  defaultIfEmpty(): Observable<A>;
}

export interface OrderQuery<A> extends FinalQuery<A> {
  below(idOrObject: string | DataType, type?: RangeType): FinalQuery<A[]>; // default open(exclusive)
}

export interface FindQuery<A> {
  fetch(): SingleFinalQuery<A>;

  watch(): Observable<A>;
}

export interface CreatedObject {
  id: string;
}

export interface JSONObject {
  [key: string]: DataType | JSONObject | Array<DataType>;
}

export type DataType = number | string | boolean | null | JSONObject
  | number[] | string[] | boolean[] | null[] | JSONObject[];

/* local record, not yet stored */
export interface NewRecord {
  id?: string;

  [key: string]: DataType;
}

/* get from database */
export interface OldRecord extends NewRecord {
  id: string;
}

type idOrOldRecord<A> = string | (A & OldRecord);
type oneOrList<A> = A | Array<A>;

export interface TableObject<A> extends TableQuery<A> {
  find(x: string | A): FindQuery<A>;

  findAll(x: string | A, ...xs: Array<string | A>): TableQuery<A>;

  insert(oneOrList: A | A[]): Observable<CreatedObject>;

  remove(x: idOrOldRecord<A>): Observable<string>;

  removeAll(xs: Array<idOrOldRecord<A>>): Observable<{ id: string }>;

  replace(oneOrList: oneOrList<A & OldRecord>): Observable<A>;

  store(oneOrList: oneOrList<A>): Observable<{ id: string }>;

  update(oneOrList: oneOrList<A & OldRecord>): Observable<oneOrList<A>>;

  upsert(oneOrList: oneOrList<A>): Observable<oneOrList<A>>;
}

export interface AggregateObject {
  [key: string]: FindQuery<NewRecord> | DataType | Observable<NewRecord> | Promise<NewRecord> | AggregateObject[]
}
