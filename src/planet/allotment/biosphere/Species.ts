import { Color4, Mesh, MeshBuilder } from "babylonjs";
import { Parcel as Parcel } from "../Parcel";

const species = ['plant', 'rabbit', 'wolf'];
const spawnProbability = 1 //0.33;
const maxSpawn = 1;
let totalSpawn = 0;

export const allSpecies: Species[] = [];

export class Species {
    species: string | null = null;
    parcel: Parcel;
    mesh: Mesh;

    constructor(parcel: Parcel) {
        if (totalSpawn >= maxSpawn) {
            return;
        }
        this.setSpecies();
        this.parcel = parcel;
        this.createMesh();
        totalSpawn++;
        allSpecies.push(this);
    }

    setSpecies() {
        if (Math.random() > spawnProbability) {
            this.species = null;
            return;
        }

        this.species = species[Math.floor(Math.random() * species.length)];
    }

    createMesh() {
        let color: Color4;
        switch (this.species) {
            case null:
                return;
            case 'plant':
                color = new Color4(0, 51, 25, 1);
                break;
            case 'rabbit':
                color = new Color4(204, 204, 0, 1);
                break;
            case 'wolf':
                color = new Color4(160, 160, 160, 1);
                break;
        }
        this.mesh = MeshBuilder.CreateBox("box", { size: 0.1, faceColors: [color, color, color, color, color, color] });
        this.mesh.position = this.parcel.position;
    }

    move(allotments: Parcel[]) {
        switch (this.species) {
            case null:
            case 'plant':
                break;
            case 'rabbit':
            case 'wolf':
                const randomId = this.parcel.adjacentAllotmentIds[Math.floor(Math.random() * this.parcel.adjacentAllotmentIds.length)];
                this.parcel = allotments[randomId];
                this.mesh.dispose();
                this.createMesh();
                break;
        }
    }
}