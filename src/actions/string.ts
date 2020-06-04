import { isValid } from 'date-fns';

export class StringDateHandler {
    public parseStringToDate<T, R>(data: T): R {
        let doc: any = data;

        if (doc) {
            if (Array.isArray(doc)) {
                doc = doc.map(this.checkStringToDatePropertyValue.bind(this));
            }

            if (doc.constructor.name === 'Object') {
                Object.keys(doc).forEach(key => {
                    doc[key] = this.checkStringToDatePropertyValue(doc[key]);
                });
            }
        }

        return doc;
    }

    public parseDateToString<T, R>(data: T): R {
        let doc: any = data;

        if (doc) {
            if (Array.isArray(doc)) {
                doc = doc.map(this.checkDateToStringPropertyValue.bind(this));
            }

            if (doc.constructor.name === 'Object') {
                Object.keys(doc).forEach(key => {
                    doc[key] = this.checkDateToStringPropertyValue(doc[key]);
                });
            }
        }

        return doc;
    }

    private checkDateToStringPropertyValue(element: any) {
        if (element) {
            const date = new Date(element);
            if (isValid(date) && element instanceof Date) {
                element = element.toString();
            } else {
                element = this.parseDateToString(element);
            }
        }

        return element;
    }

    private checkStringToDatePropertyValue(element: any) {
        if (element) {
            const date = new Date(element);
            if (isValid(date) && typeof element === 'string') {
                element = date;
            } else {
                element = this.parseStringToDate(element);
            }
        }

        return element;
    }
}