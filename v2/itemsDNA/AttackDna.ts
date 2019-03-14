import {ItemsDna} from "../interface/ItemsDna";
import {Human, Map} from "../structure/index";
import {Helper} from "../helper";
import {ItemsType} from "../interface/ItemsType";

export class AttackDna implements ItemsDna {
    eval(human: Human, map: Map): void {
        let warrior: Human | any = Helper.searchValueNotEqueval(map.maps, human.getPosition().getX(), human.getPosition().getY(), 1, ItemsType.human, 'getGroup', human.getGroup());
        if (warrior !== false) {
            let damage: number = human.attack();
            let addHealth = damage;
            warrior.setHealth(warrior.getHealth() - damage);
            if (warrior.getHealth() < 0) {
                addHealth += warrior.getHealth();
            }
            human.setHealth(human.getHealth() + addHealth);
        }
    }
}