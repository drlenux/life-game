import {Human, Map} from "../structure/index";

export interface ItemsDna {
    eval(human: Human, map: Map): void;
}