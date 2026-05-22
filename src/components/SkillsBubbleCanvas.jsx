import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsBubbleCanvas = ({ skills }) => {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const dimensions = useRef({ width: 800, height: 500 });
  const particles = useRef([]);
  const draggedIndex = useRef(-1);
  const pointerOffset = useRef({ x: 0, y: 0 });
  const pointerPos = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const bubbleRefs = useRef([]);

  // Tooltip state
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Initialize particles once we get container dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      dimensions.current = {
        width: rect.width,
        height: Math.max(rect.height, 500)
      };

      const isMobile = rect.width < 768;

      // Initialize particles if they haven't been initialized
      if (particles.current.length === 0) {
        const { width, height } = dimensions.current;
        const count = skills.length;

        // Position bubbles in a dispersed layout around the center to avoid severe overlap on load
        particles.current = skills.map((skill, index) => {
          // Scale radius based on skill percentage (expert = larger, proficient = smaller)
          const minRadius = isMobile ? 40 : 52;
          const maxRadius = isMobile ? 55 : 68;
          const radius = minRadius + ((skill.pct - 75) / 20) * (maxRadius - minRadius);

          // Arrange in a spiral around the center
          const angle = index * (Math.PI * 2 / 7) + Math.random() * 0.5;
          const distance = 80 + index * (isMobile ? 12 : 18);
          const startX = width / 2 + Math.cos(angle) * distance;
          const startY = height / 2 + Math.sin(angle) * distance;

          return {
            ...skill,
            x: Math.max(radius, Math.min(width - radius, startX)),
            y: Math.max(radius, Math.min(height - radius, startY)),
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius,
            mass: radius * radius * 0.01, // Mass proportional to area
            originalIndex: index
          };
        });
      } else {
        // Just adjust positions and radii on resize
        const { width, height } = dimensions.current;
        particles.current.forEach((p) => {
          const minRadius = isMobile ? 40 : 52;
          const maxRadius = isMobile ? 55 : 68;
          p.radius = minRadius + ((p.pct - 75) / 20) * (maxRadius - minRadius);
          p.mass = p.radius * p.radius * 0.01;
          p.x = Math.max(p.radius, Math.min(width - p.radius, p.x));
          p.y = Math.max(p.radius, Math.min(height - p.radius, p.y));
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [skills]);

  // Main physics loop
  useEffect(() => {
    let lastTime = performance.now();

    const updatePhysics = (time) => {
      const { width, height } = dimensions.current;
      const list = particles.current;
      const count = list.length;
      if (count === 0) {
        animationFrameRef.current = requestAnimationFrame(updatePhysics);
        return;
      }

      // Restitution coefficient (bounciness)
      const restitution = 0.5;
      // Air drag/friction (slows items down)
      const friction = 0.97;
      // Attraction to center strength
      const centerAttraction = 0.0003;
      // Mouse avoidance strength
      const repulsionRadius = 160;
      const repulsionForce = 0.08;

      const timeScale = Math.min((time - lastTime) / 16.666, 2.0); // Normalise to 60fps
      lastTime = time;

      const px = pointerPos.current.x;
      const py = pointerPos.current.y;

      // 1. Apply forces (buoyancy, center attraction, mouse repulsion)
      for (let i = 0; i < count; i++) {
        const p = list[i];

        if (i === draggedIndex.current) {
          // If dragged, position is updated by move events, keep velocity in sync
          continue;
        }

        // Gentle float upwards (buoyancy) + oscillation
        p.vy -= 0.005 * timeScale;
        p.vx += Math.sin(time * 0.002 + p.x * 0.01) * 0.01 * timeScale;

        // Attract gently back towards center to keep clustered
        const dxCenter = width / 2 - p.x;
        const dyCenter = height / 2.2 - p.y;
        p.vx += dxCenter * centerAttraction * timeScale;
        p.vy += dyCenter * centerAttraction * timeScale;

        // Repel from mouse cursor
        if (isPointerDown.current || activeTooltip) {
          const dxMouse = p.x - px;
          const dyMouse = p.y - py;
          const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
          const rSq = repulsionRadius * repulsionRadius;

          if (distMouseSq < rSq) {
            const distMouse = Math.sqrt(distMouseSq) || 0.1;
            const force = (1.0 - distMouse / repulsionRadius) * repulsionForce;
            p.vx += (dxMouse / distMouse) * force * timeScale;
            p.vy += (dyMouse / distMouse) * force * timeScale;
          }
        }

        // Apply velocities
        p.x += p.vx * timeScale;
        p.y += p.vy * timeScale;

        // Apply friction
        p.vx *= Math.pow(friction, timeScale);
        p.vy *= Math.pow(friction, timeScale);
      }

      // 2. Circle-to-circle collision resolution & elastic impulses
      for (let i = 0; i < count; i++) {
        const p1 = list[i];
        for (let j = i + 1; j < count; j++) {
          const p2 = list[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const minDist = p1.radius + p2.radius;

          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq) || 0.1;
            const overlap = minDist - dist;

            // Collision normal vector
            const nx = dx / dist;
            const ny = dy / dist;

            // Resolve overlapping (static push)
            const totalMass = p1.mass + p2.mass;
            const ratio1 = p2.mass / totalMass;
            const ratio2 = p1.mass / totalMass;

            if (i !== draggedIndex.current && j !== draggedIndex.current) {
              p1.x -= nx * overlap * ratio1;
              p1.y -= ny * overlap * ratio1;
              p2.x += nx * overlap * ratio2;
              p2.y += ny * overlap * ratio2;
            } else if (i === draggedIndex.current) {
              p2.x += nx * overlap;
              p2.y += ny * overlap;
            } else {
              p1.x -= nx * overlap;
              p1.y -= ny * overlap;
            }

            // Relative velocity vector
            const kx = p1.vx - p2.vx;
            const ky = p1.vy - p2.vy;
            const vn = kx * nx + ky * ny;

            // Only bounce if they are moving towards each other
            if (vn > 0) {
              const impulse = (2 * vn) / totalMass;
              const bounceImpulse = impulse * (1.0 + restitution);

              if (i !== draggedIndex.current) {
                p1.vx -= bounceImpulse * p2.mass * nx;
                p1.vy -= bounceImpulse * p2.mass * ny;
              }
              if (j !== draggedIndex.current) {
                p2.vx += bounceImpulse * p1.mass * nx;
                p2.vy += bounceImpulse * p1.mass * ny;
              }
            }
          }
        }
      }

      // 3. Boundary collisions
      const borderElasticity = 0.65;
      for (let i = 0; i < count; i++) {
        const p = list[i];
        if (i === draggedIndex.current) continue;

        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = -p.vx * borderElasticity;
        } else if (p.x + p.radius > width) {
          p.x = width - p.radius;
          p.vx = -p.vx * borderElasticity;
        }

        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = -p.vy * borderElasticity;
        } else if (p.y + p.radius > height) {
          p.y = height - p.radius;
          p.vy = -p.vy * borderElasticity;
        }
      }

      // 4. Update DOM element positions via high-performance translate3d styles
      for (let i = 0; i < count; i++) {
        const p = list[i];
        const el = bubbleRefs.current[p.originalIndex];
        if (el) {
          el.style.transform = `translate3d(${p.x - p.radius}px, ${p.y - p.radius}px, 0)`;
        }
      }

      // 5. Update active tooltip coordinates in real-time if visible
      if (activeTooltip) {
        const currentHovered = list.find(p => p.name === activeTooltip.name);
        if (currentHovered) {
          // Adjust tooltip coordinates
          let ttLeft = currentHovered.x + currentHovered.radius + 10;
          if (ttLeft + 250 > width) {
            ttLeft = currentHovered.x - currentHovered.radius - 240;
          }
          let ttTop = currentHovered.y - 70;
          ttTop = Math.max(10, Math.min(height - 150, ttTop));

          const tooltipEl = document.getElementById('skills-bubble-tooltip');
          if (tooltipEl) {
            tooltipEl.style.transform = `translate3d(${ttLeft}px, ${ttTop}px, 0)`;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [activeTooltip]);

  // Pointer drag and drop operations
  const handlePointerDown = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    pointerPos.current = { x: px, y: py };
    isPointerDown.current = true;

    // Find if clicked inside any particle
    const list = particles.current;
    let clickedIdx = -1;

    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      const dx = p.x - px;
      const dy = p.y - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < p.radius) {
        clickedIdx = i;
        break; // prioritize top layer
      }
    }

    if (clickedIdx !== -1) {
      draggedIndex.current = clickedIdx;
      const p = list[clickedIdx];
      pointerOffset.current = {
        x: px - p.x,
        y: py - p.y
      };
      
      // Update tooltip immediately to the clicked bubble
      setActiveTooltip({
        name: p.name,
        level: p.level,
        pct: p.pct,
        desc: p.desc,
        glow: p.glow,
        icon: p.icon
      });
    }
  };

  const handlePointerMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    pointerPos.current = { x: px, y: py };

    if (draggedIndex.current !== -1 && isPointerDown.current) {
      const p = particles.current[draggedIndex.current];
      
      // Calculate drag speed
      const targetX = px - pointerOffset.current.x;
      const targetY = py - pointerOffset.current.y;
      
      p.vx = (targetX - p.x) * 0.45;
      p.vy = (targetY - p.y) * 0.45;
      
      p.x = targetX;
      p.y = targetY;
    }
  };

  const handlePointerUp = () => {
    draggedIndex.current = -1;
    isPointerDown.current = false;
  };

  // Hover state (handles displaying and hiding tooltips)
  const handleBubblePointerEnter = (skill) => {
    if (draggedIndex.current === -1) {
      setActiveTooltip({
        name: skill.name,
        level: skill.level,
        pct: skill.pct,
        desc: skill.desc,
        glow: skill.glow,
        icon: skill.icon
      });
    }
  };

  const handleBubblePointerLeave = () => {
    if (!isPointerDown.current) {
      setActiveTooltip(null);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[580px] md:h-[620px] bg-zinc-950/40 border border-white/5 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Dynamic Grid Background Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Floating Instructions Banner */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[10px] md:text-xs text-white/50 tracking-wider font-satoshi pointer-events-none uppercase flex items-center gap-2 backdrop-blur-md z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
        Drag bubbles to throw them or hover to view details
      </div>

      {/* Bubble DOM Nodes (Animated via Physics transform) */}
      {skills.map((skill, index) => {
        // Calculate diameters and render sizes based on skill specs
        const pctNormal = (skill.pct - 75) / 20; // 0 to 1 range
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const minRadius = isMobile ? 40 : 52;
        const maxRadius = isMobile ? 55 : 68;
        const radius = minRadius + pctNormal * (maxRadius - minRadius);
        
        return (
          <div
            key={skill.name}
            ref={el => bubbleRefs.current[index] = el}
            className="absolute left-0 top-0 rounded-full flex flex-col items-center justify-center border border-white/10 bg-zinc-900/60 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-white/30 hover:bg-zinc-800/80 transition-colors duration-300 z-10 group"
            style={{ 
              width: radius * 2, 
              height: radius * 2,
              willChange: 'transform'
            }}
            onPointerEnter={() => handleBubblePointerEnter(skill)}
            onPointerLeave={handleBubblePointerLeave}
          >
            {/* Ambient inner gradient glow */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${skill.glow} opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`} />

            {/* Glowing outer shadow ring */}
            <div className="absolute inset-0 rounded-full border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] pointer-events-none" />

            {/* Content stack */}
            <div className="flex flex-col items-center justify-center p-2 text-center select-none pointer-events-none z-10">
              {/* Icon */}
              <div className="w-6 h-6 md:w-8 md:h-8 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                {skill.icon}
              </div>
              
              {/* Name */}
              <span className="text-[9px] md:text-[10px] font-bold text-white/80 group-hover:text-white mt-1.5 font-syne tracking-tight max-w-[75px] md:max-w-[95px] truncate overflow-hidden block">
                {skill.name.split(' (')[0]} {/* Shorten name slightly for mobile */}
              </span>

              {/* Mini tag for expert level */}
              {skill.pct >= 90 && (
                <span className="text-[7px] font-extrabold text-indigo-400 uppercase tracking-widest mt-0.5 opacity-60">
                  PRO
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Floating Tooltip Card */}
      <AnimatePresence>
        {activeTooltip && (
          <motion.div
            id="skills-bubble-tooltip"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-0 w-[220px] md:w-[245px] bg-zinc-950/90 border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-40 pointer-events-none flex flex-col gap-2 font-satoshi"
            style={{
              willChange: 'transform'
            }}
          >
            {/* Skill Gradient Glow Overlay */}
            <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full bg-gradient-to-br ${activeTooltip.glow} blur-2xl opacity-40`} />

            {/* Header info */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                {activeTooltip.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">
                  {activeTooltip.level}
                </span>
                <h4 className="text-sm font-bold font-syne text-white truncate max-w-[150px]">
                  {activeTooltip.name}
                </h4>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-white/60 leading-relaxed font-satoshi relative z-10 mt-1">
              {activeTooltip.desc}
            </p>

            {/* Progress bar */}
            <div className="flex flex-col gap-1 mt-2 relative z-10">
              <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-white/40 tracking-wider">
                <span>Proficiency</span>
                <span className="text-white/80">{activeTooltip.pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  style={{ width: `${activeTooltip.pct}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsBubbleCanvas;
