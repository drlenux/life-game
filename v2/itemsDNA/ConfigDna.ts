import {ItemsDna} from "../interface/ItemsDna";
import {
    CloneDna,
    NoneDna,
    RightDna,
    BottomDna,
    LeftDna,
    TopDna,
    EatDna,
    UpdateDna,
    AttackDna,
    WorkDna,
    GroupAttack, ChangeGroup
} from './index'

export class ConfigDna {
    public static readonly availableDNA: number[] = [
        0, // top
        1, // left
        2, // bottom
        3, // right
        4, // none,
        5, // clone
        6, // eat
        7, // update dna
        8, // attack
        9, // work
        10, // group-attack
        11, // change-group
    ];

    public static readonly chanceDNA: number[] = [
        500, // top
        500, // left
        500, // bottom
        500, // right
        150, // none,
        450, // clone
        500, // eat
        10, // update dna
        20, // attack
        500, // work
        50, // group-attack
        1, // change-group
    ];

    public static createDna(dna: number): ItemsDna {
        let newDna: ItemsDna;

        switch (dna) {
            case 0 :
                newDna = new TopDna();
                break;
            case 1:
                newDna = new LeftDna();
                break;
            case 2:
                newDna = new BottomDna();
                break;
            case 3:
                newDna = new RightDna();
                break;
            case 4 :
                newDna = new NoneDna();
                break;
            case 5:
                newDna = new CloneDna();
                break;
            case 6 :
                newDna = new EatDna();
                break;
            case 7 :
                newDna = new UpdateDna();
                break;
            case 8 :
                newDna = new AttackDna();
                break;
            case 9 :
                newDna = new WorkDna();
                break;
            case 10 :
                newDna = new GroupAttack();
                break;
            case 11 :
                newDna = new ChangeGroup();
                break;
        }
        return newDna;
    }
}