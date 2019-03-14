import {ItemsDna} from "../interface/ItemsDna";
import {Human} from "../structure/Human";
import {Map} from "../structure/Map";

export class NoneDna implements ItemsDna{
    eval(human: Human, map: Map): void {
    }
}