import { Color4, MeshBuilder, StandardMaterial } from "babylonjs";

export function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function createCube(color: Color4) {
    const material = new StandardMaterial("mat");
    const box = MeshBuilder.CreateBox("box", { size: 0.1, faceColors: [color, color, color, color, color, color] });
    box.material = material;
    return box;
}