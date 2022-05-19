import { Injectable, Type } from "@angular/core";
import { DateUtils } from "projects/ui/src/utilities";


@Injectable()
export class JsonParser {
    constructor(private _dateUtils: DateUtils) {
    }

    parser(key: string, value: string): string | Date {
        if (typeof value !== "string")
            return value;

        if (key == "$type" && value.indexOf("Dictionary") > -1)
            return;

        var date = this._dateUtils.parseDate(value);
        if (date !== null)
            return date;

        return value;
    }

    fromJson<T>(type: Type<any>, data: string, instance: T = null): T {
        var parsed = JSON.parse(data, (k, v) => this.parser(k, v));

        if (!instance)
            instance = new type();

        for (let prop in parsed) {
            if (typeof (parsed[prop]) !== undefined)
                instance[prop] = parsed[prop];
        }

        return instance;
    }
}
