import { injectable } from "inversify";
import moment from "moment";
import {DateRange} from "./DateRange";

@injectable()
export class DateUtils {
    static localeFormat = "";

    public getToday(): Date {
        var today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }

    public getMonth(date: Date): DateRange {
        let start = new Date(date.getTime());
        start.setDate(1);
        let end = new Date(start.getTime());
        end.setMonth(end.getMonth() + 1);
        end.setDate(0);
        return new DateRange(start, end);
    }

    public isValidDate(value: any): boolean {
        return Object.prototype.toString.call(value) === "[object Date]"
            && !isNaN((<Date>value).valueOf()) && (<Date>value).getTime() != 0;
    }
    
    public handleDateInput(value: any): Date | null {
        if (this.isValidDate(value))
            return value;
        
        if(value instanceof moment)
            return (<moment.Moment>value).toDate();

        if(typeof value !== "string") 
            return null;

        // remove utf8 / encoding for ie (General Punctuation unicode)
        value = encodeURIComponent(value);
        value = value.replace(/%E2%80%8E/g, "");
        value = decodeURIComponent(value);

        if(!this.isDateFormat(value)) {
            return null;
        }

        return <Date>this.parseDate(value);
    }

    public isDateFormat(value: string): boolean {
        return this.isLocaleDateFormat(value) || this.isIsoDateFormat(value);
    }

    public isLocaleDateFormat(value: string): boolean {
        var ex = /^(\d{1,4})\/(\d{1,4})\/(\d{1,4})$/;
        return ex.exec(value) ? true : false;
    }

    public isIsoDateFormat(value: string): boolean {
        var dateExpressions: RegExp[] = [];
        dateExpressions.push(/^(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})$/);
        dateExpressions.push(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})?$/);
        dateExpressions.push(/^\/Date\((d|-|.*)\)[\/|\\]$/);
        dateExpressions.push(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/);

        for(let exp of dateExpressions)
            if(exp.exec(value))
                return true;

        return false;
    }

    // public getLocaleDaysOfWeek(pattern: "E" | "EEE" | "EEEE"): string[] {
    //     const datePipe = new DatePipe(fuelUiOptions.locale);

    //     var date = new Date(2016, 11, 4);
    //     var days: string[] = [];
    //     for(let i = 0; i < 7; i++) {
    //         days.push(datePipe.transform(date, pattern))
    //         date.setDate(date.getDate() + 1);
    //     }

    //     return days;
    // }

    public parseDate(value: string, format: string = null): Date {
        if(typeof value !== "string")
            return null
         
        if(value.length > 30)
            return null;
        
        let date: moment.Moment = null;
        if(format) {
            date = moment(value, format);
        // } else if(this.isLocaleDateFormat(value)) {
        //     date = moment(value, this.getLocaleFormat());
        } else if(this.isIsoDateFormat(value)) {
            date = moment(value);
        }

        if(date && date.isValid()) {
            return date.toDate();
        }

        return null;
    }

    formatDateForServer(date: Date): string {
        try {
            return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
        } catch(err) {
            return "invalid date";
        }    
    }

    getMonthName(month: number) {
        let monthNames = [];
        
        // if(options.locale.indexOf("fr") >= 0) {
        //     monthNames = ["janvier", "février", "mars", "avril", "mai", "juin",
        //         "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
        // } else {
            monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
        // }
        
        return monthNames[month - 1];
    }

    addDaysToDate(date: Date, numberOfDays: number): Date {
        date.setDate(date.getDate() + numberOfDays);
        return date;
    }

    getArrayOfDates(startDate: Date, endDate: Date): Date[] {
        let dates: Date[] = [];
        let diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(24*60*60*1000)));

        for(let i = 1; i <= diffDays; i++){
            dates.push(moment(this.addDaysToDate(new Date(startDate.toString()), i)).hour(0).toDate());
        }

        return dates;
    }

    getNumberOfNights(startDate: Date, endDate: Date): number {
        if(!startDate || !endDate)
            return 0;
            
        return Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(24*60*60*1000)));
    }

    // public getLocaleFormat(): string {
    //     if(DateUtils.localeFormat.length == 0)
    //         DateUtils.localeFormat = this.generateLocaleFormat();
    //     return DateUtils.localeFormat;
    // }

    // public generateLocaleFormat(): string {
    //     var lds = new Date(2016, 9, 25).toLocaleDateString(options.locale);
    //     var yPosi = lds.search("2016");
    //     var dPosi = lds.search("25");
    //     var mPosi = lds.search("10");

    //     //Sometimes the month is displayed by the month name so guess where it is
    //     if (mPosi == -1)
    //     {
    //         mPosi = lds.search("9");
    //         if (mPosi == -1)
    //         {
    //             //if the year and day are not first then maybe month is first
    //             if (yPosi != 0 && dPosi != 0)
    //             {
    //                 mPosi = 0;
    //             }
    //             //if year and day are not last then maybe month is last
    //             else if ((yPosi+4 <  lds.length) && (dPosi+2 < lds.length)){
    //                 mPosi = Infinity;
    //             }
    //             //otherwist is in the middle
    //             else if (yPosi < dPosi){
    //                 mPosi = ((dPosi - yPosi)/2) + yPosi;
    //             } else if (dPosi < yPosi){
    //                 mPosi = ((yPosi - dPosi)/2) + dPosi;
    //             }
    //         }
    //     }

    //     var formatString = "";
    //     var order = [yPosi, dPosi, mPosi];
    //     order.sort(function(a,b){return a-b});

    //     for(let i = 0; i < order.length; i++)
    //     {
    //         if(order[i] == yPosi)
    //         {
    //             formatString += "YYYY/";
    //         }else if(order[i] == dPosi){
    //             formatString += "DD/";
    //         }else if(order[i] == mPosi){
    //             formatString += "MM/";
    //         }
    //     }

    //     return formatString.substring(0, formatString.length-1);
    // }
}