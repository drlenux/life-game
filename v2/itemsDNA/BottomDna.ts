import {ItemsDna} from "../interface/ItemsDna";
import {Human} from "../structure/Human";
import {Map} from "../structure/Map";
import {Positions} from "../structure/Positions";
import {Zero} from "../items/Zero";
import {Config} from "../config";

export class BottomDna implements ItemsDna {
    eval(human: Human, map: Map): void {
        if (human.getPosition().getX() < Config.mapX - 1 && !map.maps[human.getPosition().getX() + 1][human.getPosition().getY()].isBlockedForStepArea()) {
            map.maps[human.getPosition().getX() + 1][human.getPosition().getY()] = human;
            map.maps[human.getPosition().getX()][human.getPosition().getY()] = new Zero(human.getPosition());
            human.updatePosition(new Positions(human.getPosition().getX() + 1, human.getPosition().getY()));
        }
    }
}