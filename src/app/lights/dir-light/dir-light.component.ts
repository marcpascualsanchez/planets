import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable()
export class DirLightComponent {
  light;
  helper;

  constructor() {
    this.light = new THREE.DirectionalLight(0xffffff, 0.5);
    this.light.position.set(10, 25, 10);
    this.helper = new THREE.DirectionalLightHelper(this.light, 5);
  }

  getLight() {
    return this.light;
  }

  getHelper() {
    return this.helper;
  }

}
