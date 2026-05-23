import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flower, Droplets, Leaf, Wind } from 'lucide-react';

const PerfumeCreation = () => {
  const containerRef = useRef(null);
  const bottleRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const items = itemsRef.current;
    const bottle = bottleRef.current;

    const ctx = gsap.context(() => {
      // Floating animation for items
      items.forEach((item, i) => {
        gsap.to(item, {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

      // Periodic "merging" effect
      const mergeTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      
      mergeTl.to(items, {
        x: 0,
        y: 0,
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.in"
      })
      .to(bottle, {
        scale: 1.1,
        filter: "brightness(1.5) drop-shadow(0 0 20px rgba(201, 169, 110, 0.6))",
        duration: 0.3,
        ease: "power2.out"
      })
      .to(bottle, {
        scale: 1,
        filter: "brightness(1) drop-shadow(0 0 0px rgba(0,0,0,0))",
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      })
      .to(items, {
        x: (i) => (i % 2 === 0 ? -150 : 150) * Math.random(),
        y: (i) => (i < 2 ? -100 : 100) * Math.random(),
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const ingredients = [
    { icon: <Flower className="text-pink-400" />, label: "Rose" },
    { icon: <Droplets className="text-blue-400" />, label: "Oud" },
    { icon: <Leaf className="text-green-500" />, label: "Cedar" },
    { icon: <Wind className="text-amber-400" />, label: "Amber" },
  ];

  return (
    <div ref={containerRef} className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f5f0eb] to-[#ede7df] rounded-3xl">
      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] bg-white/40 blur-[100px] rounded-full" />

      {/* Floating Ingredients */}
      {ingredients.map((ing, i) => (
        <div
          key={i}
          ref={el => itemsRef.current[i] = el}
          className="absolute flex flex-col items-center gap-2 z-10"
          style={{
            left: `${20 + (i * 20)}%`,
            top: i % 2 === 0 ? '20%' : '60%'
          }}
        >
          <div className="p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white">
            {ing.icon}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#a89880] font-medium">{ing.label}</span>
        </div>
      ))}

      {/* Center Bottle */}
      <div ref={bottleRef} className="relative z-20 w-32 h-48">
        <div className="absolute inset-0 bg-[#2c2c2c] rounded-2xl shadow-2xl overflow-hidden border-2 border-[#c9a96e]/30">
          {/* Liquid Effect */}
          <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-[#c9a96e]/40 to-transparent animate-pulse" />
          {/* Label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 border border-[#c9a96e]/40 flex items-center justify-center text-[#c9a96e]">
            <span className="text-[8px] uppercase tracking-[0.3em] font-light rotate-90">VOLENTE</span>
          </div>
        </div>
        {/* Cap */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-6 bg-[#1a1a1a] rounded-t-lg border-b border-[#c9a96e]/20" />
      </div>

      {/* Title Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-[9px] tracking-[0.4em] uppercase text-[#a89880] mb-1">The Art of Extraction</p>
        <h3 className="text-2xl font-light text-[#2c2c2c]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Nature Refined</h3>
      </div>
    </div>
  );
};

export default PerfumeCreation;
