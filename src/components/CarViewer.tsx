import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { useCarConfig } from '@/hooks/useCarConfig';

const CarViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { color, wheelType } = useCarConfig();
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Camera position
    camera.position.set(5, 2, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(10, 10, 10);
    spotLight.angle = 0.15;
    spotLight.penumbra = 1;
    scene.add(spotLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load('/models/car.glb', (gltf) => {
      const model = gltf.scene;
      
      // Apply materials
      model.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === 'body') {
          child.material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.8,
            roughness: 0.2,
          });
        }
        if (child instanceof THREE.Mesh && child.name === 'wheels') {
          const scale = wheelType === 'sport' ? 1.1 : wheelType === 'luxury' ? 1.2 : 1;
          child.scale.set(scale, scale, scale);
        }
      });

      scene.add(model);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [color, wheelType]);

  return <div ref={containerRef} className="w-full h-screen bg-gradient-to-b from-gray-900 to-gray-800" />;
};

export default CarViewer;