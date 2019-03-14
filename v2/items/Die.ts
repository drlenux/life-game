import {Items, ItemsType} from "../interface/index";
import {Zero} from "./Zero";
import {Positions} from "../structure/Positions";

export class Die implements Items {
    private ageForDie: number;
    private readonly position: Positions;

    constructor(position: Positions) {
        this.position = position;
    }

    addHealth(count: number): void {
    }

    evalEvent(items: Items): void {
    }

    getType(): number {
        return ItemsType.die;
    }

    isBlockedForStepArea(): boolean {
        return false;
    }

    isDie(): boolean {
        return this.ageForDie <= 0;
    }

    nextStep(): void {
        this.ageForDie--;
    }

    returnAfterDie(): Items {
        return new Zero(this.position);
    }

    getPosition(): Positions {
        return this.position;
    }
}