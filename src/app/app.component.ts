import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { HemisLightComponent } from './lights/hemis-light/hemis-light.component';
import { DirLightComponent } from './lights/dir-light/dir-light.component';
import { SkyBoxComponent } from './environment/skybox/skybox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  scene;
  camera;
  mesh;
  controls;
  loader;
  dirLightPosition;
  directionalLight;
  lightHelper;
  hemiLight;
  hemiLightHelper;
  planet;

  constructor(
    private hemisLight: HemisLightComponent,
    private dirLight: DirLightComponent,
    private skyBox: SkyBoxComponent,
  ) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    

    this.scene.add(
      hemisLight.getLight(),
      //hemisLight.getHelper(),
      dirLight.getLight(),
      //dirLight.getHelper(),
      skyBox.getSkyBox(),
      );

    this.camera.position.z = 50;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //controls.update() must be called after any manual changes to the camera's transform

  }

  ngOnInit() {
    this.loader = new OBJLoader();
    let self = this;
    // load a resource
    this.loader.load('../assets/models/hexasphere-20-3.obj',
      ( object )  => {
        self.planet = object;
        console.log(object);
        self.planet.rotation.x -= 0.5
        for (let j = 0; j < object.children.length; j++) {
            object.children[j].material.color.setHex(0x8A2BE2);
        }
        self.scene.add( object );
        self.animate();
      },
      ( error ) => { console.log( 'An error happened' );
    });
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.planet.rotation.y += 0.003;
    this.renderer.render(this.scene, this.camera);
  }
}