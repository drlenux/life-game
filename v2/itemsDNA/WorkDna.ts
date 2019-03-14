import {ItemsDna} from "../interface/ItemsDna";
import {Human, Map} from "../structure/index";
import {Helper} from "../helper";
import {ItemsType} from "../interface/ItemsType";
import {Eat, Zero} from "../items/index";
import {Config} from "../config";

export class WorkDna implements ItemsDna {
    eval(human: Human, map: Map): void {
        let item: Zero | any = Helper.search(map.maps, human.getPosition().getX(), human.getPosition().getY(), 1, [ItemsType.zero, ItemsType.eat]);
        if (item !== false) {
            map.maps[item.getPosition().getX()][item.getPosition().getY()] = new Eat(Config.generateEatValueByWork, item.getPosition());
        }
    }
}