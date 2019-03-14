import {ItemsDna} from "../interface/ItemsDna";
import {Human} from "../structure/Human";
import {Map} from "../structure/Map";
import {Positions} from "../structure/Positions";
import {Zero} from "../items/Zero";
import {Config} from "../config";

export class RightDna implements ItemsDna {
    eval(human: Human, map: Map): void {
        if (human.getPosition().getY() < Config.mapY - 1 && !map.maps[human.getPosition().getX()][human.getPosition().getY() + 1].isBlockedForStepArea()) {
            map.maps[human.getPosition().getX()][human.getPosition().getY() + 1] = human;
            map.maps[human.getPosition().getX()][human.getPosition().getY()] = new Zero(human.getPosition());
            human.updatePosition(new Positions(human.getPosition().getX(), human.getPosition().getY() + 1));
        }
    }
}