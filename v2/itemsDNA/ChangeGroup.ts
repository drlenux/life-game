import {ItemsDna} from "../interface/ItemsDna";
import {Human, Map} from "../structure/index";

export class ChangeGroup implements ItemsDna {
    eval(human: Human, map: Map): void {
        map.groups++;
        human.setGroup(map.groups);
    }
}