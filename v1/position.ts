export class Position {
    public readonly x: number;
    public readonly y: number;
    public readonly error: boolean;

    public constructor(x: number, y: number, error: boolean) {
        this.x = x;
        this.y = y;
        this.error = error;
    }
}