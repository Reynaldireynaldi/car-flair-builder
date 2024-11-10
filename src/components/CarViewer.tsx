import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';
import { useCarConfig } from '@/hooks/useCarConfig';

const CarModel = () => {
  const { color, wheelType } = useCarConfig();
  const modelRef = useRef<THREE.Group>();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/models/car.glb', (gltf) => {
      if (modelRef.current) {
        modelRef.current.clear(); // Clear existing children
        modelRef.current.add(gltf.scene);

        // Apply materials after model is loaded
        const bodyMesh = gltf.scene.getObjectByName('body');
        if (bodyMesh && bodyMesh instanceof THREE.Mesh) {
          const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.8,
            roughness: 0.2,
          });
          bodyMesh.material = material;
        }

        // Apply wheel modifications
        const wheels = gltf.scene.getObjectByName('wheels');
        if (wheels) {
          const scale = wheelType === 'sport' ? 1.1 : wheelType === 'luxury' ? 1.2 : 1;
          wheels.scale.set(scale, scale, scale);
        }
      }
    });
  }, [color, wheelType]);

  return <group ref={modelRef} position={[0, 0, 0]} />;
};

const CarViewer = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Canvas>
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