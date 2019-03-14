import {Human, Positions} from "./index";
import {Config} from "../config";
import {ItemsType, Items} from "../interface/index";
import {Helper} from "../helper";
import {Eat, HumanMan, HumanWoman, Zero} from "../items/index";
import {Canvas} from "../canvas";

export class Map {
    public maps: Items[][] = [];
    public humans: Human[] = [];
    public groups: number;
    public groupsArr: Human[][] = [];
    private canvas: Canvas;


    constructor() {
        for (let x = 0; x < Config.mapX; x++) {
            for (let y = 0; y < Config.mapY; y++) {
                this.maps[x][y] = new Zero(new Positions(x, y));
            }
        }
        for (let i = 0; i < Config.countStartHuman; i++) {
            let gender = !!Helper.getRand(0, 1);
            let human: Human;
            let age = Helper.getRand(0, Config.maxAge);
            let x = Helper.getRand(0, Config.mapX);
            let y = Helper.getRand(0, Config.mapY);

            if (this.maps[x][y].getType() === ItemsType.zero) {
                if (gender) {
                    human = new HumanMan(age, 100, i, new Positions(x, y), Helper.createDNA());
                } else {
                    human = new HumanWoman(age, 100, i, new Positions(x, y), Helper.createDNA());
                }
                this.maps[x][y] = human;
            }
        }
        this.groups = Config.countStartHuman;
        this.canvas = new Canvas();
        this.canvas.update(this.maps);
    }

    public nextStep(): void {
        this.fillHumansAndGroups();
        for (let x = 0; x < Config.mapX; x++) {
            for (let y = 0; y < Config.mapY; y++) {
                let item: Items = this.maps[x][y];
                item.nextStep(this);
                if (item.isDie()) {
                    this.maps[x][y] = item.returnAfterDie();
                }
            }
        }

        for (let i = 0; i < Config.generateEatBeforeStep; i++) {
            let x = Helper.getRand(0, Config.mapX - 1);
            let y = Helper.getRand(0, Config.mapY - 1);

            if (this.maps[x][y].getType() === ItemsType.zero) {
                this.maps[x][y] = new Eat(Config.generateEatValue, new Positions(x, y));
            }
        }
        this.canvas.update(this.maps);
    }

    private fillHumansAndGroups(): void {
        for (let x = 0; x < Config.mapX; x++) {
            for (let y = 0; y < Config.mapY; y++) {
                if (this.maps[x][y].getType() === ItemsType.human) {
                    let item: Human | any = this.maps[x][y];
                    this.humans.push(item);
                    this.groupsArr[item.getGroup()].push(item)
                }
            }
        }
    }

}