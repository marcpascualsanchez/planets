import { ArcRotateCamera, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from "babylonjs";

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);
const planetName = 'planet';

function createScene(): Scene {
    var scene: Scene = new Scene(engine);

    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 6, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    const g = BABYLON.MeshBuilder.CreateGoldberg(planetName, { m: 3, n: 2 });

    return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
    const planet = scene.getMeshByName(planetName);
    planet?.rotate(new Vector3(0, 1, 0), 0.005);
});