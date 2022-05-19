import { container } from "infrastructure";
import { injectable } from "inversify";
import { DateUtils } from "./DateUtils";

@injectable()
export class JsonParser {
    constructor(private _dateUtils: DateUtils) {
    }

    parser(key: string, value: string): string | Date | undefined {
        if (typeof value !== "string")
            return value;

        if (key == "$type" && value.indexOf("Dictionary") > -1)
            return;

        var date = this._dateUtils.parseDate(value);
        if (date !== null)
            return date;

        return value;
    }

    fromJson<T>(type: new() => T, data: string, instance: T | undefined = undefined): T {
        var parsed = JSON.parse(data, (k, v) => this.parser(k, v));

        if (!instance)
            instance = new type();

        for (let prop in parsed) {
            if (typeof (parsed[prop]) !== undefined)
                (<any>instance)[prop] = parsed[prop];
        }

        return instance;
    }
}

container.bind<JsonParser>(JsonParser).toSelf();