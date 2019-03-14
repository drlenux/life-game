import {Positions, Map} from '../structure/index';

export interface Items {
    nextStep(map: Map): void;

    getType(): number;

    isDie(): boolean;

    isBlockedForStepArea(): boolean;

    evalEvent(items: Items): void;

    addHealth(count: number): void;

    returnAfterDie(): Items;

    getPosition(): Positions;
}