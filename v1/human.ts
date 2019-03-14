import {Config} from "./config";
import {Helper} from "./helper";
import {Item} from "./Item";

export class Human implements Item{
    private dna: any;
    private positionX: number;
    private positionY: number;
    private step: number;
    private genderMale: boolean;
    private health: number = 100;
    private age: number = 0;
    private group: number = 0;
    private damage: number = 1;
    private myChilds: Human[] = [];
    private generation: number = 0;

    public constructor(x: number, y: number, genderMale: boolean, dna: any) {
        this.age = Helper.getRand(0, Config.maxAge);
        this.dna = dna;
        this.positionX = x;
        this.positionY = y;
        this.genderMale = genderMale;
        this.step = -1;
    }

    public static createDNA(): any {
        let dna = [];
        for (let i = 0; i < Config.maxCountDNA; i++) {
            let item = Human.getItemDNA();
            let command = Helper.availableDNA[item];
            dna.push(command);
        }
        return dna;
    }

    private static getTotalChanceDNA(): number {
        let total: number = 0;
        for (let i = 0; i < Helper.chanceDNA.length; i++) {
            total += Helper.chanceDNA[i];
        }
        return total;
    }

    private static getItemDNA(): number {
        let total = Human.getTotalChanceDNA();
        let rand = Helper.getRand(0, total);
        let position = 0;
        for (let i = 0; i < Helper.chanceDNA.length; i++) {
            position += Helper.chanceDNA[i];
            if (position > rand) {
                return i;
            }
        }
        return Helper.availableDNA.length - 1;
    }

    public updateDNA() {
        let position = Helper.getRand(0, this.dna.length - 1);
        let update = Human.getItemDNA();
        this.dna[position] = Helper.availableDNA[update];
    }

    public clone(x: number, y: number): Human {
        let gender: boolean = !!Helper.getRand(0, 1);
        return new Human(x, y, gender, this.dna);
    }

    public nextStep(): number {
        if (this.age <= 0) {
            this.health = 0;
            return;
        }
        this.step++;
        this.step = this.step % this.dna.length;
        this.age--;
        return this.dna[this.step];
    }

    public getHealth(): number {
        return this.health;
    }

    public update(x: number, y: number, health: number) {
        this.positionX = x;
        this.positionY = y;
        this.health = health;
    }

    public getX(): number {
        return this.positionX;
    }

    public getY(): number {
        return this.positionY;
    }

    public getGender(): boolean {
        return this.genderMale;
    }

    public getDNA(): number[] {
        return this.dna;
    }

    public getGroup(): number {
        return this.group;
    }

    public setGroup(group: number) {
        this.group = group;
    }

    public attack(): number {
        return this.damage++;
    }

    public changeGroups(newGroup: number) {
        this.myChilds.map((item) => {
            if (item.getGroup() === this.getGroup()) {
                item.setGroup(newGroup);
            }
        });
    }

    public getGeneration(): number {
        return this.generation;
    }

    public setGeneration(generation: number) {
        this.generation = generation;
    }

    public getType(): number {
        return Config.itemTypes.people;
    }
}