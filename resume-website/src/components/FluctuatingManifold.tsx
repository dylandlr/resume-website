import * as THREE from "three";
import { useEffect, useRef } from "react";

const FluctuatingManifold = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Manifold Geometry
    const geometry = new THREE.IcosahedronGeometry(2, 15);
    const material = new THREE.MeshStandardMaterial({
      color: 0x66ccff,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Light
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Animation - Fluctuate vertices
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Apply fluctuation to vertices
      geometry.vertices.forEach((vertex) => {
        const waveX1 = 0.5 * Math.sin(vertex.x * 2 + elapsedTime);
        const waveY1 = 0.5 * Math.sin(vertex.y * 2 + elapsedTime);
        const waveZ1 = 0.5 * Math.sin(vertex.z * 2 + elapsedTime);

        vertex.x += waveX1 * 0.02;
        vertex.y += waveY1 * 0.02;
        vertex.z += waveZ1 * 0.02;
      });

      geometry.verticesNeedUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default FluctuatingManifold;
