import { isValid } from './utils';

export class StringDateHandler {
    /**
     * Converts ISO date strings to JS Date objects.
     * @param data Object to be parsed in order to convert all ISO date strings to JS Date objects
     */
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

    /**
     * Converts ISO date strings to JS Date objects.
     * @param data Object to be parsed in order to convert all JS Dates to ISO date strings
     */
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
                element = element.toISOString();
            } else {
                element = this.parseDateToString(element);
            }
        }

        return element;
    }

    private checkStringToDatePropertyValue(element: any) {
        if (element) {
            if (typeof element === 'string') {
                // date string in the format yyyy-MM-dd
                const dateStr = element.split('T')[0];

                // time string in the format HH:mm:ss
                const timeStr = element.split('T')[1]?.split('.').splice(0, 3)[0];

                const datePattern = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
                const timePattern = /^([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/;

                const isValidDate = isValid(new Date(element)) && timePattern.test(timeStr) && datePattern.test(dateStr);
                if (isValidDate) {
                    element = new Date(element);
                } else {
                    element = this.parseStringToDate(element);
                }
            } else {
                element = this.parseStringToDate(element);
            }
        }

        return element;
    }
}