import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { damping, orbitPosition, seededRandom } from './math';
import GeometricFallback from './GeometricFallback';

export default function HeroSphere({ paused }: { paused: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.dataset.webgl = 'fallback';
    let renderer: THREE.WebGLRenderer;
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2', {
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      });
      if (!context) return;
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }
    host.dataset.webgl = 'active';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.6, 9.7);
    camera.lookAt(0, 0, 0);
    const root = new THREE.Group();
    scene.add(root);
    scene.add(new THREE.AmbientLight(0x8caaff, 1.6));
    const light = new THREE.PointLight(0x53b8ff, 35);
    light.position.set(-3, 3, 4);
    scene.add(light);
    const violet = new THREE.PointLight(0x8c44ff, 30);
    violet.position.set(3, -1, 3);
    scene.add(violet);
    const globe = new THREE.Group();
    root.add(globe);
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(1.76, 40, 28),
      new THREE.MeshPhysicalMaterial({
        color: 0x183b75,
        roughness: 0.4,
        metalness: 0.3,
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
      }),
    );
    globe.add(shell);
    globe.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.8, 2)),
        new THREE.LineBasicMaterial({ color: 0x407cc7, transparent: true, opacity: 0.25 }),
      ),
    );
    for (let j = 0; j < 5; j++) {
      const ring = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 128 }, (_, i) => {
            const a = (i / 128) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(a) * 1.82, Math.sin(a) * 1.82, 0);
          }),
        ),
        new THREE.LineBasicMaterial({
          color: j % 2 ? 0x9b65f2 : 0x4aa8ff,
          transparent: true,
          opacity: 0.19,
        }),
      );
      ring.rotation.set(j * 0.63, j * 0.46, 0);
      globe.add(ring);
    }
    const core = new THREE.Group();
    root.add(core);
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.MeshStandardMaterial({
        color: 0x225bc7,
        emissive: 0x064d91,
        emissiveIntensity: 0.8,
        metalness: 0.75,
        roughness: 0.18,
        transparent: true,
        opacity: 0.8,
      }),
    );
    cube.rotation.set(0.4, 0.7, 0.2);
    core.add(cube);
    cube.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(cube.geometry),
        new THREE.LineBasicMaterial({ color: 0x71d2ff }),
      ),
    );
    core.position.y = 0.55;
    const satellites: { mesh: THREE.Group; radius: number; speed: number; offset: number }[] = [];
    for (let i = 0; i < 4; i++) {
      const orbit = new THREE.Group();
      orbit.rotation.set(0.3 + i * 0.64, i * 0.65, 0.1 + i * 0.4);
      root.add(orbit);
      const radius = 2.12 + i * 0.23;
      const path = new THREE.BufferGeometry().setFromPoints(
        Array.from(
          { length: 181 },
          (_, j) => new THREE.Vector3(...orbitPosition((j / 180) * Math.PI * 2, radius)),
        ),
      );
      orbit.add(
        new THREE.Line(
          path,
          new THREE.LineBasicMaterial({
            color: i % 2 ? 0x9763f2 : 0x4b99d0,
            transparent: true,
            opacity: 0.55,
          }),
        ),
      );
      const satellite = new THREE.Group();
      orbit.add(satellite);
      const ball = new THREE.Mesh(
        new THREE.SphereGeometry(i === 1 ? 0.115 : 0.085, 16, 12),
        new THREE.MeshBasicMaterial({ color: i % 2 ? 0xbc8eff : 0x6cd9ff }),
      );
      satellite.add(ball);
      for (let k = 1; k < 4; k++)
        satellite.add(
          new THREE.Mesh(
            new THREE.SphereGeometry(0.1 + k * 0.05, 12, 8),
            new THREE.MeshBasicMaterial({
              color: i % 2 ? 0x8a45ff : 0x38baff,
              transparent: true,
              opacity: 0.08 / k,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
            }),
          ),
        );
      satellites.push({ mesh: satellite, radius, speed: 0.12 + i * 0.035, offset: i * 2 });
    }
    const small = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.32, 0.32),
      new THREE.MeshStandardMaterial({ color: 0x25618a, metalness: 0.5, roughness: 0.3 }),
    );
    small.position.set(-0.4, -0.7, 0.7);
    small.rotation.set(0.4, 0.6, 0.2);
    root.add(small);
    small.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(small.geometry),
        new THREE.LineBasicMaterial({ color: 0x52abff }),
      ),
    );
    const rand = seededRandom(42);
    const count = window.innerWidth < 700 ? 80 : 220;
    const vertices = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      vertices[i * 3] = (rand() - 0.5) * 10;
      vertices[i * 3 + 1] = (rand() - 0.5) * 7;
      vertices[i * 3 + 2] = (rand() - 0.5) * 5 - 2;
    }
    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(vertices, 3)),
      new THREE.PointsMaterial({ color: 0x748ee7, size: 0.016, transparent: true, opacity: 0.6 }),
    );
    scene.add(stars);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true,
      frame = 0,
      lastFrame = 0,
      clock = 0;
    const pointer = { x: 0, y: 0 };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    const onPointer = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      pointer.x = ((event.clientX - box.left) / box.width - 0.5) * 0.24;
      pointer.y = ((event.clientY - box.top) / box.height - 0.5) * 0.18;
    };
    host.addEventListener('pointermove', onPointer, { passive: true });
    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      if (now - lastFrame < 1000 / 30) return;
      const dt = Math.min((now - lastFrame) / 1000, 0.06);
      lastFrame = now;
      const moving = !pausedRef.current && !reduced.matches;
      if (moving) {
        clock += dt;
        globe.rotation.y = clock * 0.055;
        core.position.y = 0.55 + Math.sin(clock * 0.6) * 0.08;
        cube.rotation.y += dt * 0.16;
        root.rotation.y = damping(root.rotation.y, pointer.x, dt);
        root.rotation.x = damping(root.rotation.x, pointer.y, dt);
      }
      for (const s of satellites)
        s.mesh.position.set(...orbitPosition(clock * s.speed, s.radius, s.offset));
      renderer.render(scene, camera);
      if (!moving) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const start = () => {
      if (visible && !document.hidden && !frame) {
        lastFrame = performance.now();
        frame = requestAnimationFrame(animate);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(host);
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else start();
    };
    const restart = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      start();
    };
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', restart);
    host.addEventListener('portfolio-resume', restart);
    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(frame);
      frame = 0;
      host.dataset.webgl = 'fallback';
    };
    renderer.domElement.addEventListener('webglcontextlost', onLost);
    start();
    return () => {
      host.dataset.webgl = 'fallback';
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', restart);
      host.removeEventListener('portfolio-resume', restart);
      host.removeEventListener('pointermove', onPointer);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);
  useEffect(() => {
    hostRef.current?.dispatchEvent(new Event('portfolio-resume'));
  }, [paused]);
  return (
    <div
      className="webgl-host"
      data-paused={paused}
      ref={hostRef}
      role="img"
      aria-label="Esfera tecnológica con núcleo cúbico, conexiones y órbitas paramétricas; alternativa geométrica si WebGL no está disponible"
    >
      <GeometricFallback />
    </div>
  );
}
