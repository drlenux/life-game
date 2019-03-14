import {ItemsDna} from "../interface/ItemsDna";
import {Human, Map} from '../structure/index';
import {Helper} from "../helper";
import {ItemsType} from "../interface/ItemsType";

export class EatDna implements ItemsDna {
    eval(human: Human, map: Map): void {
        let eat = Helper.search(map.maps, human.getPosition().getX(), human.getPosition().getY(), 1, ItemsType.eat);
        if (eat !== false) {
            eat.evalEvent(human);
        }
    }
}