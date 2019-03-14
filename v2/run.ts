import {Map} from "./structure/Map";

export class Run {
    private map: Map;

    constructor() {
        this.map = new Map();
    }

    public run() {
        this.map.nextStep();
    }
}