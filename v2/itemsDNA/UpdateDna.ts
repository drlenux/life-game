import {ItemsDna} from "../interface/ItemsDna";
import {Human, Map} from "../structure/index";

export class UpdateDna implements ItemsDna {
    eval(human: Human, map: Map): void {
        human.updateDNA();
    }
}