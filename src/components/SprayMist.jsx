import React, { useEffect, useRef } from 'react';

const SprayMist = ({ active }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        // Start from nozzle (relative to canvas)
        this.x = canvas.width * 0.45; 
        this.y = canvas.height * 0.3;
        
        // Spray direction (towards top-right/right)
        this.vx = Math.random() * 4 + 2;
        this.vy = (Math.random() - 0.5) * 3;
        
        this.alpha = 0.6;
        this.size = Math.random() * 3 + 1;
        this.decay = Math.random() * 0.015 + 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.size += 0.1; // Grow as it dissipates

        if (this.alpha <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
      // Stagger start times
      particles[i].alpha = Math.random();
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="pointer-events-none absolute z-20"
      style={{ 
        mixBlendMode: 'screen',
        filter: 'blur(1px)'
      }}
    />
  );
};

export default SprayMist;
