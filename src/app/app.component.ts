import { Component, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

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

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.dirLightPosition = new THREE.Vector3(0, 1, 0);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(10, 25, 10);
    this.lightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
    this.scene.add(this.directionalLight, this.lightHelper);

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    this.hemiLight.color.setHSL(0.6, 1, 0.6);
    this.hemiLight.groundColor.setHSL(0.035, 1, 0.75);
    this.hemiLight.position.set(0, 25, 0);
    this.scene.add(this.hemiLight);

    this.hemiLightHelper = new THREE.HemisphereLightHelper(this.hemiLight, 10);
    this.scene.add(this.hemiLightHelper);

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