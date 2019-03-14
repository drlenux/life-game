import {Human} from "../structure/Human";

export class HumanWoman extends Human {
    public genderIsMan(): boolean {
        return false;
    }

    public genderIsWoman(): boolean {
        return true;
    }
}