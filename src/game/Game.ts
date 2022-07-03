import { Planet } from '../planet/Planet';

export class Game {
    turnTime: 1000;
    planet: Planet;

    constructor() {
        this.planet = new Planet({ m: 3, n: 2 });
        this.start();
    }

    start() {
        console.log('************ starting ', );
        setInterval(
            () => this.planet.startTurn(),
            this.turnTime,
        )
    }
}