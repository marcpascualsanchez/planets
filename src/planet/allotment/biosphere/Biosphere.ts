import { Color4, Mesh, MeshBuilder } from "babylonjs";
import { Allotment } from "../Allotment";

const species = ['plant', 'rabbit', 'wolf'];
const spawnProbability = 0.33;

export class Biosphere {
    species: string | null = null;
    position;
    mesh: Mesh;

    constructor(position) {
        this.setSpecies();
        this.position = position;
        this.createMesh();
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
        this.mesh.position = this.position;
    }

    move(allotments: Allotment[], adjacentAllotmentIds: number[]) {
        switch (this.species) {
            case null:
            case 'plant':
                break;
            case 'rabbit':
            case 'wolf':
                const randomId = adjacentAllotmentIds[Math.floor(Math.random() * species.length)];
                const targetAllotment = allotments[randomId];
                targetAllotment.biosphere = this;
                this.mesh.dispose();
                this.position = targetAllotment.position;
                this.createMesh();
                break;
        }
    }
}