import { Scene } from 'babylonjs';
import { Planet } from '../planet/Planet';
import { Skybox } from '../skybox/Skybox';

export class Game {
    static autoIncrementalId = 0;
    static turnTime = 1500;
    planet: Planet;
    skybox: Skybox;

    constructor(scene: Scene) {
        this.skybox = new Skybox(scene);
        this.planet = new Planet({ m: 3, n: 2 });
        this.start();
    }

    start() {
        setInterval(
            () => this.planet.startTurn(),
            Game.turnTime,
        )
    }

    static getId() {
        this.autoIncrementalId++;
        return this.autoIncrementalId;
    }
}