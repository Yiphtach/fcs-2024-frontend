import { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Import scenes
import { createNewYorkCityScene } from '../../public/animations/scenes/newYorkCity';
import { createMetropolisScene } from '../../public/animations/scenes/metropolis';
import { createAsgardScene } from '../../public/animations/scenes/asgard';

// Loading Component
const LoadingScreen = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
    <div className="text-center">
      <div className="loading-spinner mb-4" />
      <p className="text-white">Loading Fight Scene...</p>
    </div>
  </div>
);

const FightAnimation = ({ moveType, location, onAnimationComplete, winner, loser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [winnerName] = useState(winner);
  const [loserName] = useState(loser);

  useEffect(() => {
    console.log(`Fight between ${winnerName} vs ${loserName}`);
  }, [winnerName, loserName]);

  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const composerRef = useRef(null);
  const winnerMixerRef = useRef(null);
  const loserMixerRef = useRef(null);
  const frameIdRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  // Scene creation with error handling
  const initializeScene = useCallback(() => {
    try {
      switch (location) {
        case 'New York City':
          return createNewYorkCityScene();
        case 'Metropolis':
          return createMetropolisScene();
        case 'Asgard':
          return createAsgardScene();
        default: {
          const defaultScene = new THREE.Scene();
          defaultScene.background = new THREE.Color(0x000000);
          return defaultScene;
        }
      }
    } catch (error) {
      console.error('Error creating scene:', error);
      setError('Failed to create scene');
      return new THREE.Scene();
    }
  }, [location]);

  // Post-processing setup
  const setupPostProcessing = useCallback((renderer, scene, camera) => {
    const composer = new EffectComposer(renderer);
    
    // Render pass
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Outline pass
    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );
    outlinePass.edgeStrength = 3.0;
    outlinePass.edgeGlow = 0.5;
    outlinePass.edgeThickness = 1.0;
    outlinePass.pulsePeriod = 0;
    outlinePass.visibleEdgeColor.set('#ffffff');
    outlinePass.hiddenEdgeColor.set('#000000');
    composer.addPass(outlinePass);

    // Bloom pass for special effects
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);

    return { composer, outlinePass };
  }, []);

  // Load model with progress tracking
  const loadModel = useCallback((url, position, scale, animations) => {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.position.set(...position);
          model.scale.set(...scale);
          
          // Setup animations
          const mixer = new THREE.AnimationMixer(model);
          animations.forEach(({ name, options = {} }) => {
            const clip = THREE.AnimationClip.findByName(gltf.animations, name);
            if (clip) {
              const action = mixer.clipAction(clip);
              Object.assign(action, options);
              action.play();
            }
          });

          resolve({ model, mixer });
        },
        (progress) => {
          const percentage = (progress.loaded / progress.total) * 100;
          setAnimationProgress(percentage);
        },
        reject
      );
    });
  }, []);

  useEffect(() => {
    let mounted = true;
    const mount = mountRef.current;

    const initialize = async () => {
      try {
        // Scene setup
        sceneRef.current = initializeScene();

        // Camera setup
        cameraRef.current = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        cameraRef.current.position.set(0, 2, 5);

        // Renderer setup
        rendererRef.current = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current.setPixelRatio(window.devicePixelRatio);
        rendererRef.current.shadowMap.enabled = true;
        mount.appendChild(rendererRef.current.domElement);

        // Controls setup
        controlsRef.current = new OrbitControls(
          cameraRef.current,
          rendererRef.current.domElement
        );
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;
        controlsRef.current.maxDistance = 10;
        controlsRef.current.minDistance = 3;

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        sceneRef.current.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        sceneRef.current.add(directionalLight);

        // Post-processing setup
        const { composer, outlinePass } = setupPostProcessing(
          rendererRef.current,
          sceneRef.current,
          cameraRef.current
        );
        composerRef.current = composer;

        // Load models
        const [winnerModel, loserModel] = await Promise.all([
          loadModel(
            '/animations/assets/winnerModel.glb',
            [-1, 0, 0],
            [0.5, 0.5, 0.5],
            [
              { name: 'punch', options: { loop: THREE.LoopOnce } },
              moveType === 'Critical Hit' && {
                name: 'powerPunch',
                options: { loop: THREE.LoopOnce }
              }
            ].filter(Boolean)
          ),
          loadModel(
            '/animations/assets/loserModel.glb',
            [1, 0, 0],
            [0.5, 0.5, 0.5],
            [{ name: 'dodge', options: { loop: THREE.LoopOnce } }]
          )
        ]);

        if (mounted) {
          sceneRef.current.add(winnerModel.model);
          sceneRef.current.add(loserModel.model);
          outlinePass.selectedObjects.push(winnerModel.model, loserModel.model);
          
          winnerMixerRef.current = winnerModel.mixer;
          loserMixerRef.current = loserModel.mixer;

          // Add event listeners for animation completion
          winnerModel.mixer.addEventListener('finished', () => {
            loserModel.mixer.addEventListener('finished', onAnimationComplete);
          });

          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing scene:', error);
        if (mounted) {
          setError('Failed to initialize fight scene');
          setIsLoading(false);
        }
      }
    };

    initialize();

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      const delta = clockRef.current.getDelta();

      if (controlsRef.current) controlsRef.current.update();
      if (winnerMixerRef.current) winnerMixerRef.current.update(delta);
      if (loserMixerRef.current) loserMixerRef.current.update(delta);

      composerRef.current?.render();
    };

    animate();

    // Cleanup
    return () => {
      mounted = false;
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (mount && rendererRef.current) {
        mount.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      // Dispose of all resources
      sceneRef.current?.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [location, moveType, initializeScene, setupPostProcessing, loadModel, onAnimationComplete]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !composerRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
      composerRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/80">
        <div className="text-center text-white">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />
      {isLoading && <LoadingScreen />}
      {animationProgress > 0 && animationProgress < 100 && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/60 rounded p-2">
            <div className="h-2 bg-gray-700 rounded overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${animationProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FightAnimation.propTypes = {
  winner: PropTypes.string.isRequired,
  loser: PropTypes.string.isRequired,
  moveType: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  onAnimationComplete: PropTypes.func
};

FightAnimation.defaultProps = {
  onAnimationComplete: () => {}
};

export default FightAnimation;