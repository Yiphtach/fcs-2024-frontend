// AsgardScene
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AsgardScene = () => {
  // Reference to the mounting DOM element
  const mountRef = useRef(null);

  useEffect(() => {
    // Store the ref's current value
    const currentMount = mountRef.current;
    // Get the width and height of the mount element for renderer sizing
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Create a new Three.js scene
    const scene = new THREE.Scene();

    // Load background texture (Asgard landscape)
    const loader = new THREE.TextureLoader();
    const backgroundTexture = loader.load('/animations/assets/backgrounds/asgard.jpg');
    scene.background = backgroundTexture;

    // Add mystical golden ambient light
    const ambientLight = new THREE.AmbientLight(0xffd700, 1.8);  // Golden light
    scene.add(ambientLight);

    // Add spotlights to simulate magical Asgardian energy
    const magicLight1 = new THREE.SpotLight(0x00ffcc, 1.5);
    magicLight1.position.set(10, 20, 10);
    magicLight1.angle = Math.PI / 6;
    magicLight1.penumbra = 0.5;
    scene.add(magicLight1);

    const magicLight2 = new THREE.SpotLight(0xff00ff, 1.5);
    magicLight2.position.set(-10, 20, 10);
    magicLight2.angle = Math.PI / 6;
    magicLight2.penumbra = 0.5;
    scene.add(magicLight2);

    // Optional: Add floating platforms or structures
    const platformGeometry = new THREE.CircleGeometry(5, 32);
    const platformMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(0, 10, -20);
    platform.rotation.x = Math.PI / 2;
    scene.add(platform);

    // Set up a camera with perspective projection
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    // Create the WebGL renderer and set its size
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // Append the renderer's canvas to the DOM element
    currentMount.appendChild(renderer.domElement);

    // Animation loop to render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function to remove the renderer on component unmount
    return () => {
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []); // Empty dependency array ensures this effect runs only once after mount

  // Render a div that will contain our Three.js canvas
  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default AsgardScene;
