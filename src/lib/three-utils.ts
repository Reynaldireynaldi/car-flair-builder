import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

export const createEnvironmentMap = () => {
  const pmremGenerator = new THREE.PMREMGenerator(new THREE.WebGLRenderer());
  pmremGenerator.compileEquirectangularShader();
  
  const envTexture = new THREE.CubeTextureLoader().load([
    '/env/px.jpg', '/env/nx.jpg',
    '/env/py.jpg', '/env/ny.jpg',
    '/env/pz.jpg', '/env/nz.jpg'
  ]);
  
  return pmremGenerator.fromCubemap(envTexture).texture;
};

export const animateCamera = (
  camera: THREE.Camera,
  targetPosition: THREE.Vector3,
  duration: number = 1000
) => {
  new TWEEN.Tween(camera.position)
    .to({
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z
    }, duration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
};

export const updateMaterialColor = (
  material: THREE.Material,
  color: string,
  metalness: number = 0.8,
  roughness: number = 0.2
) => {
  if (material instanceof THREE.MeshStandardMaterial) {
    material.color.set(color);
    material.metalness = metalness;
    material.roughness = roughness;
    material.needsUpdate = true;
  }
};