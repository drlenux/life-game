import {Items} from "../interface/Items";
import {ItemsType} from "../interface/ItemsType";
import {Zero} from "./Zero";
import {Positions} from "../structure/Positions";

export class Eat implements Items {
    private ageForDie: number;
    private health: number;
    private readonly Positions: Positions;

    constructor(health: number, Positions: Positions) {
        this.health = health;
        this.Positions = Positions;
        this.ageForDie = 10;
    }

    getType(): number {
        return ItemsType.eat;
    }

    isBlockedForStepArea(): boolean {
        return false;
    }

    isDie(): boolean {
        return (this.ageForDie <= 0) || (this.health <= 0);
    }

    nextStep(): void {
        this.ageForDie--;
    }

    evalEvent(items: Items): void {
        items.addHealth(this.health);
        this.health = 0;
    }

    addHealth(count: number): void {
        this.health += count;
    }

    returnAfterDie(): Items {
        return new Zero(this.Positions);
    }

    getPosition(): Positions {
        return this.Positions;
    }
}