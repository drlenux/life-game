import {Config} from './config';
import {Items, ItemsType} from "./interface/index";

export class Canvas {
    private area: any;

    public constructor() {
        this.area = document.getElementById(Config.area);
    }

    private clearCanvas() {
        if (this.area.getContext) {
            let ctx = this.area.getContext('2d');
            ctx.clearRect(0, 0, this.area.width, this.area.height);
        }
    }

    private createPeople(x: number, y: number, gender: boolean) {
        if (Config.mapX < x || Config.mapY < y) {
            return;
        }

        if (this.area.getContext) {
            let ctx = this.area.getContext('2d');
            ctx.beginPath();
            ctx.arc(x,y,2, 0, Math.PI*2);
            if (gender) {
                ctx.fillStyle = '#00f';
            } else {
                ctx.fillStyle = '#f0f';
            }
            ctx.fill();
            ctx.closePath();
        }
    }

    private createEat(x: number, y: number) {
        if (Config.mapX < x || Config.mapY < y) {
            return;
        }

        if (this.area.getContext) {
            let ctx = this.area.getContext('2d');
            ctx.beginPath();
            ctx.arc(x,y,1, 0, Math.PI*2);
            ctx.fillStyle = '#ff0';
            ctx.fill();
            ctx.closePath();
        }
    }

    private createDie(x: number, y: number)
    {
        if (Config.mapX < x || Config.mapY < y) {
            return;
        }

        if (this.area.getContext) {
            let ctx = this.area.getContext('2d');
            ctx.beginPath();
            ctx.arc(x,y,1, 0, Math.PI*2);
            ctx.fillStyle = '#666';
            ctx.fill();
            ctx.closePath();
        }
    }

    public update(map: Items[][]| any[][]) {
        this.clearCanvas();
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                switch (map[x][y].getType()) {
                    case ItemsType.zero:
                        break;
                    case ItemsType.eat:
                        this.createEat(x, y);
                        break;
                    case ItemsType.die:
                        this.createDie(x, y);
                        break;
                    case ItemsType.human:
                        this.createPeople(x, y, map[x][y].genderIsMan());
                        break;
                }
            }
        }
    }
}