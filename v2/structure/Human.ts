import {Die, HumanWoman, HumanMan} from "../items/index";
import {Config} from "../config";
import {Positions, Map} from './index';
import {Helper} from "../helper";
import {ItemsDna, ItemsType, Items} from "../interface/index";
import {ConfigDna} from "../itemsDNA/index";

export abstract class Human implements Items {
    private ageForDie: number;
    private health: number;
    private group: number;
    private children: Human[] = [];
    private position: Positions;
    private dna: ItemsDna[];
    private damage: number = 1;
    private positionDna: number = -1;


    constructor(ageForDie: number, health: number, group: number, position: Positions, dna: ItemsDna[]) {
        this.ageForDie = ageForDie;
        this.health = health;
        this.group = group;
        this.position = position;
        this.dna = dna;
    }

    isDie(): boolean {
        return (this.health <= 0) || (this.ageForDie <= 0);
    }

    getType(): number {
        return ItemsType.human;
    }

    nextStep(map: Map): void {
        this.ageForDie--;
        this.health -= Config.needEatForStep;
        if (this.isDie()) return;
        this.positionDna++;
        this.dna[this.positionDna].eval(this, map);
    }

    isBlockedForStepArea(): boolean {
        return true;
    }

    returnAfterDie(): Items {
        return new Die(this.position);
    }

    addHealth(count: number): void {
        this.health += count;
    }

    evalEvent(items: Items): void {
    }

    public getPosition(): Positions {
        return this.position;
    }

    public updatePosition(position: Positions): void {
        this.position = position;
    }

    public clone(position: Positions): Human {
        let gender = !!Helper.getRand(0, 1);
        let child;
        let ageForDie = Helper.getRand(0, Config.maxAge);
        if (gender) {
            child = new HumanMan(ageForDie, 100, this.group, position, this.dna);
        } else {
            child = new HumanWoman(ageForDie, 100, this.group, position, this.dna);
        }
        this.children.push(child);
        return child;
    }

    public updateDNA(): void {
        let position = Helper.getRand(0, this.dna.length - 1);
        let newDna = Helper.getItemDNA();
        this.dna[position] = ConfigDna.createDna(newDna);

    }

    abstract genderIsMan(): boolean;

    abstract genderIsWoman(): boolean;

    public getHealth(): number
    {
        return this.health;
    }

    public setHealth(health: number): void
    {
        this.health = health;
    }

    public setGroup(group: number): void {
        this.group = group;
    }

    public getGroup(): number {
        return this.group;
    }

    public attack(): number {
        return this.damage++;
    }

    public evalDna(dna: ItemsDna, map: Map): void {
        dna.eval(this, map);
    }
}