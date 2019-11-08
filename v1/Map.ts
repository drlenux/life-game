import {Canvas} from "./canvas";
import {Config} from "./config";
import {Helper} from "./helper";
import {Human} from "./human";
import {Position} from "./position";

export class Map {
    private canvas: Canvas;

    private death: number = 0;
    private life: number = 0;
    private day: number = 0;

    private stepEat: number = 0;
    private stepClone: number = 0;
    private stepAttack: number = 0;
    private stepGroupAttack: number = 0;
    private stepChangeGroup: number = 0;
    private stepUpdateDNA: number = 0;

    private map: any = [];
    private humans: Human[];
    private groups: number[];

    private run: boolean = false;

    public constructor() {
        this.canvas = new Canvas();
        this.generateNullMap();
        this.humans = [];

        for (let i = 0; i < Config.countStartHuman; i++) {
            let x = 0;
            let y = 0;
            while (true) {
                x = Helper.getRand(0, Config.mapX - 1);
                y = Helper.getRand(0, Config.mapY - 1);
                if (this.map[x][y] === 0) {
                    break;
                }
            }
            let gender: boolean = !!Helper.getRand(0, 1);
            let dna = Human.createDNA();
            let people: Human = new Human(x, y, gender, dna);
            people.setGroup(i);
            people.setGeneration(1);

            this.humans.push(people);
            this.map[x][y] = people;
        }
        this.canvas.update(this.map);
    }

    public generateNullMap() {
        for (let i = 0; i < Config.mapX; i++) {
            this.map[i] = [];
            for (let j = 0; j < Config.mapY; j++) {
                this.map[i].push(0);
            }
        }
    }

    private initGroups()
    {
        this.groups = [];
        for (let humanId = 0; humanId < this.humans.length; humanId++) {
            let human: Human = this.humans[humanId];
            if (!Helper.in_array(human.getGroup(), this.groups)) {
                this.groups.push(human.getGroup());
            }
        }
    }

    public next() {
        if (this.run) return;
        this.run = true;
        this.life = 0;
        this.day++;
        if (!this.humans) {
            return;
        }
        this.initGroups();

        let generation: number[] = [];

        if (this.day % 10 == 0) {
            for (let i = 0; i < Config.mapX; i++) {
                for (let j = 0; j < Config.mapY; j++) {
                    if (this.map[i][j] === Config.itemTypes.die) {
                        this.map[i][j] = Config.itemTypes.zero;
                    }
                }
            }
        }

        for (let humanId = 0; humanId < this.humans.length; humanId++) {
            let human: Human = this.humans[humanId];
            let next: number = human.nextStep();
            human.update(human.getX(), human.getY(), human.getHealth() - Config.needEatForStep);
            this.evalDNA(human, next);

            if (!Helper.in_array(human.getGeneration(), generation)) {
                generation.push(human.getGeneration());
            }

            if (human.getHealth() <= 0) {
                this.map[human.getX()][human.getY()] = 2;
                // let tmp = this.humans.splice(0, humanId);
                this.humans.splice(humanId, 1);
                // this.humans = tmp.concat(this.humans);
                // delete this.humans[humanId];
                this.death++;
            }
            this.life++;
        }
        for (let i = 0; i < Config.generateEatBeforeStep; i++) {
            let x = Helper.getRand(0, Config.mapX - 1);
            let y = Helper.getRand(0, Config.mapY - 1);

            if (this.map[x] !== undefined && this.map[x][y] !== undefined && this.map[x][y] === 0) {
                this.map[x][y] = 1;
            }
        }
        this.canvas.update(this.map);

        console.clear();
        console.group('step ' + this.day);
        console.log('death: ', this.death);
        console.log('life: ', this.life);
        console.log('clone', this.stepClone);
        console.log('eat', this.stepEat);
        // console.log('map: ', this.map);
        console.log('human ', this.humans.length);
        console.log('groups', this.groups);
        console.log('attacks', this.stepAttack);
        console.log('update dna', this.stepUpdateDNA);
        console.log('group attacks', this.stepGroupAttack);
        console.log('change group', this.stepChangeGroup);
        console.log('generation', generation.length);
        console.groupEnd();
        this.run = false;
    }

    public evalDNA(human: Human, dnaType: number)
    {
        switch (dnaType) {
            case 0:
                if (human.getX() !== 0 && this.map[human.getX() - 1][human.getY()] === Config.itemTypes.zero) {
                    this.map[human.getX() - 1][human.getY()] = human;
                    this.map[human.getX()][human.getY()] = Config.itemTypes.zero;
                    human.update(human.getX() - 1, human.getY(), human.getHealth());
                }
                break;
            case 1:
                if (human.getY() !== 0 && this.map[human.getX()][human.getY() - 1] === Config.itemTypes.zero) {
                    this.map[human.getX()][human.getY() - 1] = human;
                    this.map[human.getX()][human.getY()] = Config.itemTypes.zero;
                    human.update(human.getX(), human.getY() - 1, human.getHealth());
                }
                break;
            case 2:
                if (human.getX() < Config.mapX - 1 && this.map[human.getX() + 1][human.getY()] === Config.itemTypes.zero) {
                    this.map[human.getX() + 1][human.getY()] = human;
                    this.map[human.getX()][human.getY()] = Config.itemTypes.zero;
                    human.update(human.getX() + 1, human.getY(), human.getHealth());
                }
                break;
            case 3:
                if (human.getY() < Config.mapY - 1 && this.map[human.getX()][human.getY() + 1] === Config.itemTypes.zero) {
                    this.map[human.getX()][human.getY() + 1] = human;
                    this.map[human.getX()][human.getY()] = Config.itemTypes.zero;
                    human.update(human.getX(), human.getY() + 1, human.getHealth());
                }
                break;
            case 5:
                let partner: Human = Helper.search(this.map, human.getX(), human.getY(), 1, 'getGender', !human.getGender());
                if (partner) {
                    let free: Position|any = Helper.searchValue(this.map, human.getX(), human.getY(), 1, Config.itemTypes.zero);
                    if (free !== false && !free.error) {
                        let child = human.clone(free.x, free.y);
                        child.updateDNA();
                        child.setGeneration(human.getGeneration() + 1);
                        child.setGroup(human.getGroup());
                        this.map[child.getX()][child.getY()] = child;
                        this.humans.push(child);
                        this.stepClone++;
                        let health1 = Math.round(human.getHealth() / 2);
                        let health2 = Math.round(partner.getHealth() / 2);
                        human.update(human.getX(), human.getY(), health1);
                        partner.update(partner.getX(), partner.getY(), health2);
                        partner.setGroup(human.getGroup());
                    }
                }
                break;
            case 6:
                let eat: Position|any = Helper.searchValue(this.map, human.getX(), human.getY(), 1, Config.itemTypes.eat);
                if (eat !== false && !eat.error) {
                    human.update(human.getX(), human.getY(), human.getHealth() + 10);
                    this.stepEat++;
                    this.map[eat.x][eat.y] = Config.itemTypes.zero;
                }
                break;
            case 7:
                human.updateDNA();
                this.stepUpdateDNA++;
                break;
            case 8:
                let warrior: any = Helper.searchValueNotEqueval(this.map, human.getX(), human.getY(), 1, 'getGroup', human.getGroup());
                if (warrior !== false) {
                    let damage: number = human.attack();
                    let addHealth = damage;
                    warrior.update(warrior.getX(), warrior.getY(), warrior.getHealth() - damage);
                    if (warrior.getHealth() < 0) {
                        addHealth += warrior.getHealth();
                    }
                    human.update(human.getX(), human.getY(), human.getHealth() + addHealth);
                    this.stepAttack++;
                }
                break;
            case 9 :
                let position = Helper.searchValue(this.map, human.getX(), human.getY(), 1, Config.itemTypes.zero);
                if (!position.error) {
                    this.map[position.x][position.y] = 1;
                }
                break;
            case 10 :
                this.humans.map((item) => {
                    if (item.getGroup() === human.getGroup()) {
                        this.evalDNA(item, 8);
                        this.stepGroupAttack++;
                    }
                });
                break;
            case 11 :
                let newGroup: number = 1;
                while (Helper.in_array(newGroup, this.groups)) {
                    newGroup++;
                }
                human.changeGroups(newGroup);
                this.stepChangeGroup++;
                break;
        }
    }
}