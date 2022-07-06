import { Vector3 } from "babylonjs";
import { getRandom } from "../../utils";
import { Species } from "./common/Species";
import { Plant } from "./species/Plant";
import { Rabbit } from "./species/Rabbit";
import { Wolf } from "./species/Wolf";

const spawnProbability = 0.33;
const maxSpawn = 1;
let totalSpawn = 0;

export class Parcel {
    position: Vector3;
    adjacentAllotmentIds: number[];
    species: Species;

    constructor(position: Vector3, adjacentFaceIds: number[]) {
        this.position = position;
        this.adjacentAllotmentIds = adjacentFaceIds;
        if (totalSpawn >= maxSpawn || Math.random() > spawnProbability) {
            return;
        }

        const specieClass = getRandom(['Wolf', 'Rabbit', 'Plant']);
        switch (specieClass) {
            case 'Wolf':
                this.species = new Wolf(this);
                break;
            case 'Rabbit':
                this.species = new Rabbit(this);
                break;
            case 'Plant':
                this.species = new Plant(this);
                break;
        }
    }
}