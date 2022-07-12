import { Vector3 } from "babylonjs";
import { getRandom } from "../../utils";
import { Token } from "./common/Token";
import { Plant } from "./species/Plant";
import { Rabbit } from "./species/Rabbit";
import { Wolf } from "./species/Wolf";

const spawnProbability = 1;//0.33;
const maxSpawn = 50;
let totalSpawn = 0;

export class Parcel {
    position: Vector3;
    adjacentParcelIds: number[];
    tokens: Token[] = [];

    constructor(position: Vector3, adjacentFaceIds: number[]) {
        this.position = position;
        this.adjacentParcelIds = adjacentFaceIds;
        if (totalSpawn >= maxSpawn || Math.random() > spawnProbability) {
            return;
        }
        totalSpawn++;

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

    addToken(token: Token) {
        this.tokens.push(token);
    }

    removeToken(id: number) {
        this.tokens.filter(p => p.id != id);
    }
}