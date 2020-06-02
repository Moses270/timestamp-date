import { TimestampHandler } from './actions/timestamp';
import { StringDateHandler } from './actions/string';

import * as firebase from 'firebase/app';
import 'firebase/app';

export type Timestamp = firebase.firestore.Timestamp;

export class TimestampDate {
  private tsHandler: TimestampHandler;
  private strHandler: StringDateHandler;

  constructor() {
    this.tsHandler = new TimestampHandler();
    this.strHandler = new StringDateHandler();
  }

  public getServerTimestamp(): Timestamp {
    return this.tsHandler.getServerTimestamp();
  }

  public getServerDate(): Date {
    return this.getServerTimestamp().toDate();
  }

  public timestampToDate(timestamp: Timestamp): Date {
    return this.tsHandler.timestampToDate(timestamp);
  }

  public dateToTimestamp(date: Date): Timestamp {
    return this.tsHandler.dateToTimestamp(date);
  }

  public parseTimestampToDate<T, R>(data: T): R {
    return this.tsHandler.parseTimestampToDate(data);
  }

  public parseDateToTimestamp<T, R>(data: T): R {
    return this.tsHandler.parseDateToTimestamp(data);
  }

  public parseStringToDate<T, R>(data: T): R {
    return this.strHandler.parseStringToDate(data);
  }

  public parseDateToString<T, R>(data: T): R {
    return this.strHandler.parseDateToString(data);
  }
}
