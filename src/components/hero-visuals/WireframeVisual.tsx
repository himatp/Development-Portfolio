import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WireframeVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; isTouch: boolean }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isTouch: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Detect touch device capability
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    mouseRef.current.isTouch = isTouchDevice;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    let width = container.clientWidth;
    let height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);

    // Create 3D Geometry: Compact Futuristic TorusKnot
    const geometry = new THREE.TorusKnotGeometry(1.1, 0.32, 128, 32, 2, 3);

    // Primary Glowing Wireframe Material
    const material = new THREE.MeshStandardMaterial({
      color: 0x818cf8, // Indigo-400
      wireframe: true,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2,
      metalness: 0.8,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0.45, 0);
    scene.add(mesh);

    // Inner Accent Particles Core
    const pointsGeometry = new THREE.TorusKnotGeometry(1.08, 0.3, 90, 24, 2, 3);
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xc084fc, // Purple-400
      size: 0.025,
      transparent: true,
      opacity: 0.75,
    });
    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    pointsMesh.position.set(0, 0.45, 0);
    scene.add(pointsMesh);

    // Ambient & Accent Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 4, 20); // Purple glow
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 3, 20); // Cyan accent
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    let animFrameId: number;
    let baseScale = width < 640 ? 0.65 : 0.96;

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      if (width === 0 || height === 0) return;

      baseScale = width < 640 ? 0.65 : 0.96;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // IntersectionObserver to pause when out of viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Track Mouse / Pointer position for tilt parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseRef.current.isTouch) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseRef.current.targetX = x * 1.2;
      mouseRef.current.targetY = y * 1.2;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let autoRotationX = 0;
    let autoRotationY = 0;

    const render = () => {
      if (isVisibleRef.current) {
        const scrollY = window.scrollY;

        // Dynamic scroll reaction: rotation speed & scale scaling
        const scrollSpeedFactor = isTouchDevice ? 0.003 : 0.005 + Math.min(scrollY * 0.000025, 0.015);
        const targetScale = baseScale * (1 - Math.min(scrollY / 1200, 0.3));

        autoRotationX += scrollSpeedFactor * 0.7;
        autoRotationY += scrollSpeedFactor;

        // Smooth cursor tilt lerp
        const mouse = mouseRef.current;
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Combine auto-rotation with cursor tilt
        mesh.rotation.x = autoRotationX + mouse.y * 0.6;
        mesh.rotation.y = autoRotationY + mouse.x * 0.8;

        pointsMesh.rotation.x = mesh.rotation.x;
        pointsMesh.rotation.y = mesh.rotation.y;

        // Lerp scale smoothly
        const currentScale = mesh.scale.x;
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
        mesh.scale.setScalar(newScale);
        pointsMesh.scale.setScalar(newScale * 0.98);

        renderer.render(scene, camera);
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      geometry.dispose();
      material.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative bg-transparent select-none pointer-events-auto flex items-center justify-center"
    >
      <canvas ref={canvasRef} className="block w-full h-full bg-transparent" />
    </div>
  );
};

export default WireframeVisual;
