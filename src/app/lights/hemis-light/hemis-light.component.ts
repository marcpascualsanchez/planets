import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable()
export class HemisLightComponent {
  light;
  helper;

  constructor() {
    this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    this.light.color.setHSL(0.6, 1, 0.6);
    this.light.groundColor.setHSL(0.035, 1, 0.75);
    this.light.position.set(0, 25, 0);

    this.helper = new THREE.HemisphereLightHelper(this.light, 10);
  }

  getLight() {
    return this.light;
  }

  getHelper() {
    return this.helper;
  }

}
