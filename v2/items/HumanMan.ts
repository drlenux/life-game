import {Human} from "../structure/Human";

export class HumanMan extends Human {
    public genderIsMan(): boolean {
        return true;
    }

    public genderIsWoman(): boolean {
        return false;
    }
}