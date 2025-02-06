import  { useState, useEffect } from 'react';
import { useSpring, animated, config, useChain, useSpringRef } from 'react-spring';
import { useGesture } from '@use-gesture/react';
import PropTypes from 'prop-types';

const FightAnimations = ({
  fighter1,
  fighter2,
  currentMove,
  onMoveComplete,
  health
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Spring refs for animation chaining
  const fighter1SpringRef = useSpringRef();
  const fighter2SpringRef = useSpringRef();
  const effectSpringRef = useSpringRef();

  // Fighter 1 Animations
  const fighter1Spring = useSpring({
    ref: fighter1SpringRef,
    from: { x: 0, y: 0, rotate: 0, scale: 1 },
    to: async (next) => {
      if (currentMove && fighter1.position === 'left') {
        switch (currentMove.type) {
          case 'punch':
            await next({ x: 100, rotate: 45, config: config.wobbly });
            await next({ x: 0, rotate: 0, config: config.gentle });
            break;
          case 'kick':
            await next({ y: -50, rotate: -30, config: config.wobbly });
            await next({ y: 0, rotate: 0, config: config.gentle });
            break;
          case 'special':
            await next({ scale: 1.2, rotate: 360, config: config.slow });
            await next({ scale: 1, rotate: 0, config: config.gentle });
            break;
        }
      }
    },
    config: { tension: 200, friction: 20 }
  });

  // Fighter 2 Animations
  const fighter2Spring = useSpring({
    ref: fighter2SpringRef,
    from: { x: 0, y: 0, rotate: 0, scale: 1 },
    to: async (next) => {
      if (currentMove && fighter2.position === 'right') {
        if (currentMove.type === 'block') {
          await next({ scale: 0.9, rotate: -10, config: config.gentle });
          await next({ scale: 1, rotate: 0, config: config.gentle });
        } else if (currentMove.type === 'dodge') {
          await next({ x: 50, y: -30, config: config.wobbly });
          await next({ x: 0, y: 0, config: config.gentle });
        }
      }
    }
  });

  // Impact Effect Animation
  const effectSpring = useSpring({
    ref: effectSpringRef,
    from: { opacity: 0, scale: 0 },
    to: async (next) => {
      if (currentMove && currentMove.type !== 'dodge' && currentMove.type !== 'block') {
        await next({ opacity: 1, scale: 1.5, config: config.stiff });
        await next({ opacity: 0, scale: 0, config: config.gentle });
      }
    }
  });

  // Chain animations
  useChain(
    currentMove ? 
    [fighter1SpringRef, effectSpringRef, fighter2SpringRef] : 
    [],
    [0, 0.2, 0.4]
  );

  // Gesture handling for interactive debugging
  const bind = useGesture({
    onDrag: ({ down }) => {
      if (down) {
        // Add interactive movement for debugging
      }
    }
  });

  useEffect(() => {
    if (currentMove) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onMoveComplete?.();
      }, currentMove.duration);
      return () => clearTimeout(timer);
    }
  }, [currentMove, onMoveComplete]);

  return (
    <div className="relative w-full h-[600px] bg-gray-900 overflow-hidden">
      {/* Arena Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-gray-900">
        {/* Add particle effects or environment animations here */}
      </div>

      {/* Health Bars */}
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        <div className="w-48">
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <animated.div
              className="h-full bg-green-500"
              style={{ width: `${health.fighter1}%` }}
            />
          </div>
          <p className="text-white text-sm mt-1">{fighter1.name}</p>
        </div>
        <div className="w-48">
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <animated.div
              className="h-full bg-green-500"
              style={{ width: `${health.fighter2}%` }}
            />
          </div>
          <p className="text-white text-sm mt-1">{fighter2.name}</p>
        </div>
      </div>

      {/* Fighter 1 */}
      <animated.div
        {...bind()}
        style={fighter1Spring}
        className="absolute bottom-20 left-20"
      >
        <img
          src={fighter1.imageUrl}
          alt={fighter1.name}
          className="w-48 h-48 object-contain"
        />
      </animated.div>

      {/* Fighter 2 */}
      <animated.div
        style={fighter2Spring}
        className="absolute bottom-20 right-20"
      >
        <img
          src={fighter2.imageUrl}
          alt={fighter2.name}
          className="w-48 h-48 object-contain scale-x-[-1]"
        />
      </animated.div>

      {/* Impact Effects */}
      <animated.div
        style={effectSpring}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {currentMove?.type === 'punch' && (
          <div className="text-yellow-400 text-6xl font-bold">POW!</div>
        )}
        {currentMove?.type === 'kick' && (
          <div className="text-red-400 text-6xl font-bold">WHAM!</div>
        )}
        {currentMove?.type === 'special' && (
          <div className="text-blue-400 text-6xl font-bold">SPECIAL!</div>
        )}
      </animated.div>

      {/* Move Indicator */}
      {isAnimating && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <p className="text-white text-xl font-bold">
            {`${currentMove?.type.toUpperCase()} - Power: ${currentMove?.power}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default FightAnimations;FightAnimations.propTypes = {
  fighter1: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['left', 'right']).isRequired,
  }).isRequired,
  fighter2: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['left', 'right']).isRequired,
  }).isRequired,
  currentMove: PropTypes.shape({
    type: PropTypes.oneOf(['punch', 'kick', 'special', 'block', 'dodge']),
    power: PropTypes.number,
    duration: PropTypes.number,
  }),
  onMoveComplete: PropTypes.func,
  health: PropTypes.shape({
    fighter1: PropTypes.number.isRequired,
    fighter2: PropTypes.number.isRequired,
  }).isRequired,
};