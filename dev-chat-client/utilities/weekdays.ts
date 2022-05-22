export enum Weekdays {
    None = 0,
    Sunday = 1,
    Monday = 2,
    Tuesday = 4,
    Wednesday = 8,
    Thursday = 16,
    Friday = 32,
    Saturday = 64,
    Weekdays = Monday | Tuesday | Wednesday | Thursday | Friday,
    Weekends = Saturday | Sunday,
    All = Weekdays | Weekends

}

export class DowMask {
    constructor(public value: number | Weekdays) {
    }

    hasWeekdays(day: Weekdays): boolean {
        return (this.value & day) != 0;
    }

    hasDay(day: number): boolean {
        return (this.value & (1 << day)) != 0;
    }

    hasDate(date: Date): boolean {
        return this.hasDay(date.getDay());
    }
}