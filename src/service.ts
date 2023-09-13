import { TimestampHandler } from './actions/timestamp';
import { StringDateHandler } from './actions/string';
import cloneDeep from 'lodash-es/cloneDeep';
import { Timestamp } from './models/timestamp.model';

export class TimestampDate {
  private tsHandler: TimestampHandler;
  private strHandler: StringDateHandler;

  constructor() {
    this.tsHandler = new TimestampHandler();
    this.strHandler = new StringDateHandler();
  }

  public getCurrentTimestamp(): Timestamp {
    return this.tsHandler.getCurrentTimestamp();
  }

  public getCurrentDate(): Date {
    return this.tsHandler.getCurrentDate();
  }

  public timestampToDate(timestamp: Timestamp): Date {
    return this.tsHandler.timestampToDate(timestamp);
  }

  public dateToTimestamp(date: Date): Timestamp {
    return this.tsHandler.dateToTimestamp(date);
  }

  public parseTimestampToDate<T, R>(data: T): R {
    return this.tsHandler.parseTimestampToDate(cloneDeep(data));
  }

  public parseDateToTimestamp<T, R>(data: T): R {
    return this.tsHandler.parseDateToTimestamp(cloneDeep(data));
  }

  public parseStringToDate<T, R>(data: T): R {
    return this.strHandler.parseStringToDate(cloneDeep(data));
  }

  public parseDateToString<T, R>(data: T): R {
    return this.strHandler.parseDateToString(cloneDeep(data));
  }
}
