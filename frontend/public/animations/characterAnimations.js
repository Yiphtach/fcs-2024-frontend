import React, { useEffect, useRef } from 'react';
import './characterAnimations.css';

const CharacterAnimations = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const spriteSheet = new Image();
        spriteSheet.src = '/path/to/your/spriteSheet.png';

        const frameWidth = 64;
        const frameHeight = 64;
        const totalFrames = 4;
        let currentFrame = 0;

        const drawFrame = (frameX, frameY, canvasX, canvasY) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                spriteSheet,
                frameX * frameWidth,
                frameY * frameHeight,
                frameWidth,
                frameHeight,
                canvasX,
                canvasY,
                frameWidth,
                frameHeight
            );
        };

        const animate = () => {
            drawFrame(currentFrame, 0, 0, 0);
            currentFrame = (currentFrame + 1) % totalFrames;
            requestAnimationFrame(animate);
        };

        spriteSheet.onload = () => {
            animate();
        };
    }, []);

    return <canvas ref={canvasRef} width={256} height={256}></canvas>;
};

export default CharacterAnimations;