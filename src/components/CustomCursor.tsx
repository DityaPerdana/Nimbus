import React, { useEffect, useRef } from 'react';

interface CursorProps {
  maskContent?: string;
}

export const CustomCursor: React.FC<CursorProps> = ({ maskContent = "VIEW" }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorMaskRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorMask = cursorMaskRef.current;
    let currentX = 0;
    let currentY = 0;
    let aimX = 0;
    let aimY = 0;

    const animate = () => {
      const diffX = aimX - currentX;
      const diffY = aimY - currentY;
      
      currentX += diffX * 0.1;
      currentY += diffY * 0.1;

      if (cursor) {
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
      }
      if (cursorMask) {
        cursorMask.style.left = `${currentX}px`;
        cursorMask.style.top = `${currentY}px`;
      }

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      aimX = e.clientX;
      aimY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed pointer-events-none w-8 h-8 bg-white rounded-full mix-blend-difference z-50 transition-transform duration-300 ease-out"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={cursorMaskRef}
        className="fixed pointer-events-none w-20 h-20 bg-transparent border-2 border-white rounded-full z-50 flex items-center justify-center text-white text-sm font-medium transition-all duration-300 ease-out opacity-0 hover:opacity-100"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {maskContent}
      </div>
    </>
  );
};