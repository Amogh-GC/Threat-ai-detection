import React, { useRef, useEffect } from 'react';

const NeuralNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes = [];
    const connections = [];
    const nodeCount = 15;

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 2 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Create connections
    for (let i = 0; i < nodeCount; i++) {
      const connectionsCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < connectionsCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount);
        if (targetIndex !== i) {
          connections.push({
            source: i,
            target: targetIndex,
            opacity: 0.1 + Math.random() * 0.2
          });
        }
      }
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0A0E27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const currentTime = Date.now() * 0.001;

      // Draw connections
      ctx.strokeStyle = '#00D9FF';
      connections.forEach(conn => {
        const source = nodes[conn.source];
        const target = nodes[conn.target];
        
        const opacity = conn.opacity + Math.sin(currentTime * 2 + conn.source) * 0.1;
        ctx.globalAlpha = opacity;
        
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(currentTime * 2 + node.pulsePhase) * 0.3 + 0.7;
        const radius = node.radius * pulse;
        const opacity = node.opacity * pulse;
        
        ctx.globalAlpha = opacity;
        ctx.fillStyle = '#00D9FF';
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
    />
  );
};

export default NeuralNetwork;

