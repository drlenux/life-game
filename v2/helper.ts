import {Config} from "./config";
import {Items} from "./interface/Items";
import {ConfigDna} from "./itemsDNA/ConfigDna";

export class Helper {
    public static getRand(min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min);
    }

    private static createNewMap(map: Items[][], x: number, y: number, step: number, itemsType: number | number[]): Items[] {
        let newMap: Items[] = [];
        if ("number" === typeof itemsType) {
            itemsType = [itemsType];
        }

        for (let i = x - step; i <= x + step; i++) {
            for (let j = y - step; j <= y + step; j++) {
                if (i >= 0 && i <= Config.mapX && j >= 0 && j <= Config.mapY && map[i] !== undefined && map[i][j] !== undefined) {
                    if (this.in_array(map[i][j].getType(), itemsType)) {
                        newMap.push(map[i][j]);
                    }
                }
            }
        }
        return newMap;
    }

    public static search(map: Items[][], x: number, y: number, step: number, itemsType: number | number[], method: string | null = null, value: any = null) {
        let newMap: Items[] = Helper.createNewMap(map, x, y, step, itemsType);

        for (let i = 0; i < newMap.length; i++) {
            let item: Items | any = newMap[i];
            if (method !== null) {
                if (item[method]() === value) {
                    return item;
                }
            } else {
                return item;
            }
        }
        return false;
    }

    public static searchValueNotEqueval(map: any[], x: number, y: number, step: number, itemsType: number | number[], params: string, value: any) {
        let newMap: Items[] = Helper.createNewMap(map, x, y, step, itemsType);

        for (let i = 0; i < newMap.length; i++) {
            let item: Items | any = newMap[i];
            if (item[params]() !== value) {
                return item;
            }
        }
        return false;
    }

    public static in_array(needle: any, haystack: any[], strict: boolean = false): boolean {
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

    public static createDNA(): any {
        let dna = [];
        for (let i = 0; i < Config.maxCountDNA; i++) {
            let item = Helper.getItemDNA();
            let command = ConfigDna.availableDNA[item];
            dna.push(command);
        }
        return dna;
    }

    public static getTotalChanceDNA(): number {
        let total: number = 0;
        for (let i = 0; i < ConfigDna.chanceDNA.length; i++) {
            total += ConfigDna.chanceDNA[i];
        }
        return total;
    }

    public static getItemDNA(): number {
        let total = Helper.getTotalChanceDNA();
        let rand = Helper.getRand(0, total);
        let position = 0;
        for (let i = 0; i < ConfigDna.chanceDNA.length; i++) {
            position += ConfigDna.chanceDNA[i];
            if (position > rand) {
                return i;
            }
        }
        return ConfigDna.availableDNA.length - 1;
    }
}