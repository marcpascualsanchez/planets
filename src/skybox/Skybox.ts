import { Color3, CubeTexture, Mesh, MeshBuilder, Scene, StandardMaterial, Texture } from "babylonjs";

export class Skybox {
    mesh: Mesh;

    constructor(scene: Scene) {
        const skybox = MeshBuilder.CreateBox('skyBox', { size: 1000 }, scene);
        const skyboxMaterial = new StandardMaterial('skyBox', scene);
        skyboxMaterial.backFaceCulling = false;
        const basePath = 'assets/skybox/galaxy';
        const files = [
            `${basePath}_px.png`,
            `${basePath}_py.png`,
            `${basePath}_pz.png`,
            `${basePath}_nx.png`,
            `${basePath}_ny.png`,
            `${basePath}_nz.png`,
        ]
        skyboxMaterial.reflectionTexture = CubeTexture.CreateFromImages(files, scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
        skyboxMaterial.specularColor = new Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        this.mesh = skybox;
    }
}
