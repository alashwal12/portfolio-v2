"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    let time = 0;

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      radius: 180 // Smooth repulsion radius
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = event.pageX;
      mouse.targetY = event.pageY;
    };

    const handleMouseOut = () => {
      mouse.targetX = window.innerWidth / 2;
      mouse.targetY = window.innerHeight / 2;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    class Particle {
      radius: number;
      baseAngle: number;
      color: string;
      speedModifier: number;
      angle: number;
      
      x: number;
      y: number;
      baseXOffset: number;
      baseYOffset: number;

      constructor(radius: number, baseAngle: number, color: string) {
        this.radius = radius;
        this.baseAngle = baseAngle;
        
        // Random speed modifier for parallax depth and rotation speed
        this.speedModifier = Math.random() * 0.5 + 0.1; 
        
        this.baseXOffset = Math.cos(baseAngle) * radius;
        this.baseYOffset = Math.sin(baseAngle) * radius;

        this.x = window.innerWidth / 2 + this.baseXOffset;
        this.y = window.innerHeight / 2 + this.baseYOffset;
        this.angle = baseAngle;
        this.color = color;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        
        // Length of the dash
        const length = 7;
        const endX = this.x + Math.cos(this.angle) * length;
        const endY = this.y + Math.sin(this.angle) * length;
        
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      update() {
        // Slow continuous rotation over time
        let currentAngle = this.baseAngle + time * (0.05 + this.speedModifier * 0.05);
        
        let centerX = canvas!.width / 2;
        let centerY = canvas!.height / 2;
        
        // Add a stunning organic wave drift that continuously flows through the grid
        // The phase of the wave depends on the particle's original position, creating propagating ripples
        let wavePhase = this.baseXOffset * 0.005 + this.baseYOffset * 0.005 + time * 2;
        let waveX = Math.sin(wavePhase) * 25;
        let waveY = Math.cos(wavePhase + Math.PI / 4) * 25;
        
        // Base target with rotation and wave drift
        let currentRadius = this.radius;
        let baseXOffset = Math.cos(currentAngle) * currentRadius + waveX;
        let baseYOffset = Math.sin(currentAngle) * currentRadius + waveY;

        // Smooth Parallax Shift (simulate 3D depth by moving opposite to mouse)
        let mouseOffsetX = (mouse.x - centerX) * 0.05 * this.speedModifier;
        let mouseOffsetY = (mouse.y - centerY) * 0.05 * this.speedModifier;

        let targetX = centerX + baseXOffset - mouseOffsetX;
        let targetY = centerY + baseYOffset - mouseOffsetY;

        // Mouse repulsion
        let dxMouse = mouse.x - this.x;
        let dyMouse = mouse.y - this.y;
        let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < mouse.radius) {
          let force = (mouse.radius - distanceMouse) / mouse.radius;
          let forceDirectionX = dxMouse / distanceMouse;
          let forceDirectionY = dyMouse / distanceMouse;
          
          // Soft, elegant push away from mouse
          targetX -= forceDirectionX * force * 150;
          targetY -= forceDirectionY * force * 150;
        }

        // Smooth spring interpolation
        let previousX = this.x;
        let previousY = this.y;
        
        this.x += (targetX - this.x) * 0.04;
        this.y += (targetY - this.y) * 0.04;

        // Dynamically point the dash in the direction of its actual movement for a flowing "comet" look
        // We blend it with the rotational angle so it looks cohesive
        let moveAngle = Math.atan2(this.y - previousY, this.x - previousX);
        
        // If it's barely moving, keep its rotational angle, otherwise lean into movement
        let speed = Math.sqrt(Math.pow(this.x - previousX, 2) + Math.pow(this.y - previousY, 2));
        if (speed > 0.5) {
            // Smoothly interpolate angle
            this.angle = moveAngle;
        } else {
            this.angle = currentAngle;
        }

        this.draw();
      }
    }

    function init() {
      if (!canvas) return;
      particlesArray = [];
      const isDark = resolvedTheme === "dark";
      
      const maxDistance = Math.max(canvas.width, canvas.height);
      // Denser rings for a premium look
      const rings = Math.floor(maxDistance / 30); 
      
      for (let i = 1; i <= rings; i++) {
        let radius = i * 30;
        let circumference = 2 * Math.PI * radius;
        let particleCount = Math.floor(circumference / 30);
        
        for (let j = 0; j < particleCount; j++) {
          let angle = (j / particleCount) * Math.PI * 2;
          
          let noisyRadius = radius + (Math.random() * 10 - 5);
          let noisyAngle = angle + (Math.random() * 0.05 - 0.025);
          
          let offsetX = Math.cos(noisyAngle) * noisyRadius;
          let offsetY = Math.sin(noisyAngle) * noisyRadius;
          
          // Diagonal gradient
          let screenX = canvas.width / 2 + offsetX;
          let screenY = canvas.height / 2 + offsetY;
          let percentX = screenX / canvas.width;
          let percentY = screenY / canvas.height;
          
          let targetHue = 10 + ((percentX + percentY) / 2 * 240);
          
          // Opacity fades out slightly towards the edges for a vignette effect
          let edgeFade = 1 - (radius / maxDistance) * 0.3;
          let opacity = 0.85 * edgeFade;
          
          let color = `hsla(${targetHue}, 80%, ${isDark ? '65%' : '60%'}, ${opacity})`;

          particlesArray.push(new Particle(noisyRadius, noisyAngle, color));
        }
      }
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      
      time += 0.0015; // Global rotation speed
      
      // Extremely smooth mouse tracking for parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    handleResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
      style={{ opacity: 0.9 }}
    />
  );
}
