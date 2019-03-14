import {Items} from "../interface/Items";
import {ItemsType} from "../interface/ItemsType";
import {Positions} from "../structure/Positions";

export class Zero implements Items {
    private readonly position: Positions;

    constructor(position: Positions) {
        this.position = position;
    }

    addHealth(count: number): void {
    }

    evalEvent(items: Items): void {
    }

    getType(): number {
        return ItemsType.zero;
    }

    isBlockedForStepArea(): boolean {
        return false;
    }

    isDie(): boolean {
        return false;
    }

    nextStep(): void {
    }

    returnAfterDie(): Items {
        return undefined;
    }

    getPosition(): Positions {
        return this.position;
    }
}