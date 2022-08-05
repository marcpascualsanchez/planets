import { Vector3 } from "babylonjs";
import { getRandom } from "../../utils";
import { Token } from "./common/Token";
import { Plant } from "./species/Plant";
import { Rabbit } from "./species/Rabbit";
import { Wolf } from "./species/Wolf";
import { config } from '../../game/config';
import { Cloud } from "./cloud/Cloud";

export class Parcel {
    position: Vector3;
    adjacentParcelIds: number[];
    tokens: Token[] = [];

    constructor(position: Vector3, adjacentFaceIds: number[]) {
        this.position = position;
        this.adjacentParcelIds = adjacentFaceIds;
        this.addSpecies();
        this.addClouds();
    }

    private addSpecies() {
        const { totalSpawn, maxSpawn, spawnProbability } = config.species;
        if (totalSpawn >= maxSpawn || Math.random() > spawnProbability) {
            return;
        }
        config.species.totalSpawn++;

        const specieClass = getRandom(['Wolf', 'Rabbit', 'Plant']);
        switch (specieClass) {
            case 'Wolf':
                this.tokens.push(new Wolf(this));
                break;
            case 'Rabbit':
                this.tokens.push(new Rabbit(this));
                break;
            case 'Plant':
                this.tokens.push(new Plant(this));
                break;
        }
    }

    private addClouds() {
        const { totalSpawn, maxSpawn, spawnProbability } = config.clouds;
        if (totalSpawn >= maxSpawn || Math.random() > spawnProbability) {
            return;
        }
        config.clouds.totalSpawn++;

        this.tokens.push(new Cloud(this));
    }

    public addToken(token: Token) {
        this.tokens.push(token);
    }

    public removeToken(id: number) {
        this.tokens = this.tokens.filter(p => p.id != id);
    }
}