import {ItemsDna} from "../interface/ItemsDna";
import {Human, Map} from "../structure/index";
import {AttackDna} from "./index";

export class GroupAttack implements ItemsDna {
    eval(human: Human, map: Map): void {
        map.humans.map((item: Human) => {
            if (item.getGroup() === human.getGroup()) {
                human.evalDna(new AttackDna(), map);
            }
        });
    }
}