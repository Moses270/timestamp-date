import { isValid } from 'date-fns';

import * as firebase from 'firebase/app';
import 'firebase/app';

type Timestamp = firebase.firestore.Timestamp;

export class TimestampHandler {
    public getServerTimestamp(): Timestamp {
        return firebase.firestore.Timestamp.now();
    }

    public timestampToDate(timestamp: Timestamp): Date {
        return timestamp.toDate();
    }

    public dateToTimestamp(date: Date): Timestamp {
        return firebase.firestore.Timestamp.fromDate(date);
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
            if (isValid(date)) {
                element = this.dateToTimestamp(date);
            } else {
                element = this.parseDateToTimestamp(element);
            }
        }

        return element;
    }
}
