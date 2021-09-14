import { Timestamp } from 'src/models/timestamp.model';
import { isValid } from './utils';

export class TimestampHandler {
    public getServerTimestamp(): Timestamp {
        return Timestamp.now();
    }

    public timestampToDate(timestamp: Timestamp): Date {
        return timestamp.toDate();
    }

    public dateToTimestamp(date: Date): Timestamp {
        return Timestamp.fromDate(date);
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
            if ((typeof element._seconds === 'number' || typeof element.seconds === 'number') &&
                (typeof element._nanoseconds === 'number' || typeof element.nanoseconds === 'number')) {
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
