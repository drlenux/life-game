export class Positions {
    private readonly x: number;
    private readonly y: number;
    private readonly error: boolean;

    constructor(x: number, y: number, error: boolean = false) {
        this.x = x;
        this.y = y;
        this.error = error;
    }

    public getX(): number
    {
        return this.x;
    }

    public getY(): number
    {
        return this.y;
    }

    public isError(): boolean {
        return this.error;
    }
}