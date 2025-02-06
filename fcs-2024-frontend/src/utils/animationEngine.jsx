import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';

// Import scenes for different locations
import { createNewYorkCityScene } from '../../public/animations/scenes/newYorkCity';
import { createMetropolisScene } from '../../public/animations/scenes/metropolis';
import { createAsgardScene } from '../../public/animations/scenes/asgard';

const FightAnimation = ({ winner, loser, moveType, location }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const composerRef = useRef(null);
  const winnerMixerRef = useRef(null);
  const loserMixerRef = useRef(null);
  const frameIdRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    // Scene setup
    const createScene = () => {
      switch (location) {
        case 'New York City':
          return createNewYorkCityScene();
        case 'Metropolis':
          return createMetropolisScene();
        case 'Asgard':
          return createAsgardScene();
        default:
          return new THREE.Scene();
      }
    };

    sceneRef.current = createScene();

    // Camera setup
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 5;

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(rendererRef.current.domElement);

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(10, 10, 10);
    sceneRef.current.add(pointLight);

    // Post-processing setup
    composerRef.current = new EffectComposer(rendererRef.current);
    const renderPass = new RenderPass(sceneRef.current, cameraRef.current);
    composerRef.current.addPass(renderPass);

    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      sceneRef.current,
      cameraRef.current
    );
    outlinePass.edgeStrength = 3.0;
    outlinePass.edgeGlow = 0.0;
    outlinePass.edgeThickness = 1.0;
    outlinePass.pulsePeriod = 0;
    outlinePass.visibleEdgeColor.set('#ffffff');
    outlinePass.hiddenEdgeColor.set('#000000');
    composerRef.current.addPass(outlinePass);

    // Model loading
    const loader = new GLTFLoader();

    // Load winner model
    loader.load(
      '/animations/assets/winnerModel.glb',
      (gltf) => {
        const winnerModel = gltf.scene;
        winnerModel.position.set(-1, 0, 0);
        winnerModel.scale.set(0.5, 0.5, 0.5);
        sceneRef.current.add(winnerModel);
        outlinePass.selectedObjects.push(winnerModel);

        winnerMixerRef.current = new THREE.AnimationMixer(winnerModel);
        const punchClip = THREE.AnimationClip.findByName(gltf.animations, 'punch');
        const punchAction = winnerMixerRef.current.clipAction(punchClip);
        punchAction.play();

        // Play specific attack animation based on move type
        if (moveType === 'Critical Hit') {
          const criticalHitClip = THREE.AnimationClip.findByName(
            gltf.animations,
            'powerPunch'
          );
          const criticalHitAction = winnerMixerRef.current.clipAction(criticalHitClip);
          criticalHitAction.play();
        }
      },
      undefined,
      (error) => console.error('Error loading winner model:', error)
    );

    // Load loser model
    loader.load(
      '/animations/assets/loserModel.glb',
      (gltf) => {
        const loserModel = gltf.scene;
        loserModel.position.set(1, 0, 0);
        loserModel.scale.set(0.5, 0.5, 0.5);
        sceneRef.current.add(loserModel);
        outlinePass.selectedObjects.push(loserModel);

        loserMixerRef.current = new THREE.AnimationMixer(loserModel);
        const dodgeClip = THREE.AnimationClip.findByName(gltf.animations, 'dodge');
        const dodgeAction = loserMixerRef.current.clipAction(dodgeClip);
        dodgeAction.play();
      },
      undefined,
      (error) => console.error('Error loading loser model:', error)
    );

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      composerRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();

      if (winnerMixerRef.current) winnerMixerRef.current.update(delta);
      if (loserMixerRef.current) loserMixerRef.current.update(delta);

      composerRef.current.render();
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [location, moveType]); // Re-run effect if location or moveType changes

  return <div ref={mountRef} className="w-full h-full" />;
};

export default FightAnimation;