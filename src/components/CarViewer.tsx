import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { useCarConfig } from '@/hooks/useCarConfig';

const CarModel = () => {
  const { color, wheelType } = useCarConfig();
  const gltf = useLoader(GLTFLoader, '/models/car.glb');
  const carRef = useRef<THREE.Group>();

  useEffect(() => {
    if (carRef.current) {
      const bodyMesh = carRef.current.getObjectByName('body');
      if (bodyMesh && bodyMesh instanceof THREE.Mesh) {
        if (bodyMesh.material instanceof THREE.MeshStandardMaterial) {
          bodyMesh.material.color.set(color);
          bodyMesh.material.metalness = 0.8;
          bodyMesh.material.roughness = 0.2;
          bodyMesh.material.needsUpdate = true;
        }
      }
    }
  }, [color]);

  useEffect(() => {
    if (carRef.current) {
      const wheels = carRef.current.getObjectByName('wheels');
      if (wheels) {
        const scale = wheelType === 'sport' ? 1.1 : wheelType === 'luxury' ? 1.2 : 1;
        wheels.scale.set(scale, scale, scale);
      }
    }
  }, [wheelType]);

  useFrame(() => {
    TWEEN.update();
  });

  return (
    <primitive
      ref={carRef}
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
};

const CarViewer = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} />
        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <CarModel />
      </Canvas>
    </div>
  );
};

export default CarViewer;