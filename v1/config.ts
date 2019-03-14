export class Config {
    public static readonly area: string = 'area';
    public static readonly mapX: number = 500;
    public static readonly mapY: number = 500;
    public static readonly maxCountDNA: number = 50;
    public static readonly countStartHuman: number = 1000;
    public static readonly generateEatBeforeStep: number = 1;
    public static readonly needEatForStep: number = 1;
    public static readonly maxAge: number = 365;
    public static readonly itemTypes: any = {
        zero: 0,
        eat: 1,
        die: 2,
        people: 3,
    };
}