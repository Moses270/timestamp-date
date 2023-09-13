import { Timestamp } from 'src/models/timestamp.model';
import { isValid } from './utils';

export class TimestampHandler {
    public getCurrentTimestamp(): Timestamp {
        const date = new Date();
        return this.dateToTimestamp(date);
    }

    public getCurrentDate(): Date {
        return new Date();
    }

    public timestampToDate(timestamp: Timestamp): Date {
        return new Date((timestamp._seconds || timestamp.seconds) * 1000);
    }

    public dateToTimestamp(date: Date): Timestamp {
        return {
            seconds: parseInt((date.getTime() / 1000).toFixed(2)),
            _seconds: parseInt((date.getTime() / 1000).toFixed(2)),
            nanoseconds: 1,
            _nanoseconds: 1,
        }
    }

    public parseTimestampToDate<T, R>(data: T): R {
        let doc: any = data;

        if (doc) {
            if (Array.isArray(doc)) {
                doc = doc.map(this.checkTimestampPropertyValue.bind(this));
            }

            if (doc.constructor.name === 'Object') {
                Object.keys(doc).forEach(key => {
                    doc[key] = this.checkTimestampPropertyValue(doc[key]);
                });
            }
        }

        return doc;
    }

    public parseDateToTimestamp<T, R>(data: T): R {
        let doc: any = data;

        if (doc) {
            if (Array.isArray(doc)) {
                doc = doc.map(this.checkDateTimestampPropertyValue.bind(this));
            }

            if (doc.constructor.name === 'Object') {
                Object.keys(doc).forEach(key => {
                    doc[key] = this.checkDateTimestampPropertyValue(doc[key]);
                });
            }
        }

        return doc;
    }

    private checkTimestampPropertyValue(element: any) {
        if (element) {
            if ((element._seconds >= 0 || element.seconds >= 0) &&
                (element._nanoseconds >= 0 || element.nanoseconds >= 0)) {
                element = new Date((element._seconds || element.seconds) * 1000);
            } else {
                element = this.parseTimestampToDate(element);
            }
        }

        return element;
    }

    private checkDateTimestampPropertyValue(element: any) {
        if (element) {
            const date = new Date(element);
            if (isValid(date) && element instanceof Date) {
                element = this.dateToTimestamp(date);
            } else {
                element = this.parseDateToTimestamp(element);
            }
        }

        return element;
    }
}
