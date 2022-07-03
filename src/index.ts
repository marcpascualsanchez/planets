import { ArcRotateCamera, Color4, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from "babylonjs";
import { Game } from './game/Game';

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

function createScene(): Scene {
    var scene: Scene = new Scene(engine);

    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 6, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    new Game();

    return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});