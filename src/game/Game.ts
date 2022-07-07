import { Planet } from '../planet/Planet';

export class Game {
    static autoIncrementalId = 0;
    turnTime = 1000;
    planet: Planet;

    constructor() {
        this.planet = new Planet({ m: 3, n: 2 });
        this.start();
    }

    start() {
        setInterval(
            () => this.planet.startTurn(),
            this.turnTime,
        )
    }

    static getId() {
        this.autoIncrementalId++;
        return this.autoIncrementalId;
    }
}