import {Position} from "./position";
import {Config} from "./config";

export class Helper {
    public static getRand(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min);
    }

    public static readonly availableDNA: number[] = [
        0, // top
        1, // left
        2, // bottom
        3, // right
        4, // none,
        5, // clone
        6, // eat
        7, // update dna
        8, // attack
        9, // work
        10, // group-attack
        11, // change-group
    ];

    public static readonly chanceDNA : number[] = [
        500, // top
        500, // left
        500, // bottom
        500, // right
        150, // none,
        450, // clone
        500, // eat
        10, // update dna
        20, // attack
        500, // work
        50, // group-attack
        1, // change-group
    ];

    public static search(map: any[], x: number, y: number, step: number, params: string, value: any) {
        let newMap: any[] = [];

        for (let i = x - step; i <= x + step; i++) {
            for (let j = y - step; j <= y + step; j++) {
                if (i >= 0 && i <= Config.mapX && j >= 0 && j <= Config.mapY && map[i] !== undefined && map[i][j] !== undefined) {
                    newMap.push(map[i][j]);
                }
            }
        }

        for (let i = 0; i < newMap.length; i++) {
            let human: any = newMap[i];
            if (human === 0 || human === 1 || human === 2) {
                continue;
            }
            if (human[params]() === value) {
                return human;
            }
        }
        return false;
    }

    public static searchValue(map: any[], x: number, y: number, step: number, value: any): Position {
        for (let i = x - step; i <= x + step; i++) {
            for (let j = y - step; j <= y + step; j++) {
                if (i >= 0 && i <= Config.mapX && j >= 0 && j <= Config.mapY && map[i] !== undefined && map[i][j] !== undefined) {
                    if (map[i][j] === value) {
                        return new Position(i, j, false);
                    }
                }
            }
        }
        return new Position(0, 0, true);
    }

    public static searchValueNotEqueval(map: any[], x: number, y: number, step: number, params: string, value: any)
    {
        let newMap: any[] = [];

        for (let i = x - step; i <= x + step; i++) {
            for (let j = y - step; j <= y + step; j++) {
                if (i >= 0 && i <= Config.mapX && j >= 0 && j <= Config.mapY && map[i] !== undefined && map[i][j] !== undefined) {
                    newMap.push(map[i][j]);
                }
            }
        }

        for (let i = 0; i < newMap.length; i++) {
            let human: any = newMap[i];
            if (human === 0 || human === 1 || human === 2) {
                continue;
            }
            if (human[params] !== undefined && human[params]() !== value) {
                return human;
            }
        }
        return false;
    }

    public static in_array(needle: any, haystack: any[], strict: boolean = false) {
        let found = false;
        let key;
        strict = !!strict;

        for (key in haystack) {
            if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
                found = true;
                break;
            }
        }

        return found;
    }

}