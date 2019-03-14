import {ItemsDna, ItemsType} from "../interface/index";
import {Helper} from "../helper";
import {Human, Map} from "../structure/index";

export class CloneDna implements ItemsDna {
    eval(human: Human, map: Map): void {
        let partner = Helper.search(map.maps, human.getPosition().getX(), human.getPosition().getY(), ItemsType.human, 1, 'genderIsMan', !human.genderIsMan());
        if (partner !== false) {
            let free = Helper.search(map.maps, human.getPosition().getX(), human.getPosition().getY(), 1, ItemsType.zero);
            if (free !== false) {
                let child: Human = human.clone(free.getPosition());
                child.updateDNA();
                map.maps[child.getPosition().getX()][child.getPosition().getY()] = child;
                let health1 = Math.round(human.getHealth() / 2);
                let health2 = Math.round(partner.getHealth() / 2);
                human.setHealth(health1);
                partner.setHealth(health2);
                partner.setGroup(human.getGroup());
            }
        }
    }
}