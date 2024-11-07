import React, { useRef, useEffect, useCallback } from "react";

const ManifoldBackground = () => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const pathsRef = useRef<Array<{ d: string; z: number }>>([]);

  // Same constants as before
  const U_RES = 40;
  const V_RES = 40;
  const SCALE = 120;
  const CENTER_X = 400;
  const CENTER_Y = 300;
  const VIEWER_DISTANCE = 8;

  const project3Dto2D = useCallback((x: number, y: number, z: number) => {
    const depth = VIEWER_DISTANCE + z;
    const perspective = VIEWER_DISTANCE / depth;
    return {
      x: CENTER_X + x * SCALE * perspective,
      y: CENTER_Y + y * SCALE * perspective,
      z: z,
    };
  }, []);
  const generateManifoldPoints = useCallback(
    (timeVal: number) => {
      const points = new Array(U_RES + 1);
      const timeScale = timeVal * 0.0005;

      // Generate points with one extra point to ensure closure
      for (let ui = 0; ui <= U_RES; ui++) {
        points[ui] = new Array(V_RES + 1);
        // Use modulo to create seamless connection
        const u = (ui / U_RES) * Math.PI * 2;

        for (let vi = 0; vi <= V_RES; vi++) {
          const v = (vi / V_RES) * Math.PI * 2;

          // Keep exact same shape parameters
          const R = 2;
          const r = 0.8;

          const R_dynamic = R + 0.2 * Math.sin(2 * u + timeScale);
          const r_dynamic = r + 0.1 * Math.cos(3 * v + timeScale * 1.2);

          let x = (R_dynamic + r_dynamic * Math.cos(v)) * Math.cos(u);
          let y = (R_dynamic + r_dynamic * Math.cos(v)) * Math.sin(u);
          let z = r_dynamic * Math.sin(v);

          const deform = 0.2 * Math.sin(3 * u + 2 * v + timeScale * 1.5);
          x += deform * Math.cos(u);
          y += deform * Math.sin(u);
          z += 0.15 * Math.cos(4 * u + 3 * v + timeScale);

          const rotationAngle = timeScale * 0.5;
          const cos_rot = Math.cos(rotationAngle);
          const sin_rot = Math.sin(rotationAngle);
          const x_rot = x * cos_rot - z * sin_rot;
          const z_rot = x * sin_rot + z * cos_rot;

          points[ui][vi] = project3Dto2D(x_rot, y, z_rot);

          // Add closure points
          if (ui === U_RES) {
            points[ui][vi] = points[0][vi]; // Connect back to start
          }
          if (vi === V_RES) {
            points[ui][vi] = points[ui][0]; // Connect vertical strips
          }
        }
      }

      return points;
    },
    [project3Dto2D]
  );

  type Point = { x: number; y: number; z: number };

  const generatePath = useCallback(
    (points: Point[][], isHorizontal: boolean, index: number) => {
      const path: string[] = [];
      const length = isHorizontal ? points[0].length : points.length;
      const getPoint = (i: number) =>
        isHorizontal ? points[index][i] : points[i][index];

      // Start path
      const startPoint = getPoint(0);
      path.push(`M ${startPoint.x} ${startPoint.y}`);

      // Generate smooth curve through points
      for (let i = 1; i < length; i++) {
        const prev = getPoint(i - 1);
        const curr = getPoint(i);
        const next = i < length - 1 ? getPoint(i + 1) : getPoint(0);

        // Calculate control points for smoother curve
        const cpx1 = prev.x + (curr.x - prev.x) * 0.5;
        const cpy1 = prev.y + (curr.y - prev.y) * 0.5;
        const cpx2 = curr.x - (next.x - curr.x) * 0.5;
        const cpy2 = curr.y - (next.y - curr.y) * 0.5;

        path.push(`C ${cpx1} ${cpy1} ${cpx2} ${cpy2} ${curr.x} ${curr.y}`);
      }

      // Close the path properly
      path.push("Z");

      const midPoint = Math.floor(length / 2);
      const z = getPoint(midPoint).z;

      return { d: path.join(" "), z };
    },
    []
  );
  const animate = useCallback(
    (timestamp: number) => {
      if (previousTimeRef.current === null) {
        // Check for null instead of undefined
        previousTimeRef.current = timestamp;
        timeRef.current = 0;
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      const deltaTime = timestamp - previousTimeRef.current;
      timeRef.current += deltaTime;

      const points = generateManifoldPoints(timeRef.current);
      const paths = [];

      // Generate paths
      for (let u = 0; u <= U_RES; u++) {
        paths.push(generatePath(points, true, u));
      }
      for (let v = 0; v <= V_RES; v++) {
        paths.push(generatePath(points, false, v));
      }

      paths.sort((a, b) => a.z - b.z);
      pathsRef.current = paths;

      // Update DOM efficiently
      const svgElement = document.getElementById("manifold-svg");
      if (svgElement) {
        const pathElements = svgElement.getElementsByTagName("path");
        paths.forEach((path, i) => {
          if (pathElements[i]) {
            pathElements[i].setAttribute("d", path.d);
            pathElements[i].style.opacity = (
              0.4 +
              (path.z + 2) * 0.15
            ).toString();
          }
        });
      }

      previousTimeRef.current = timestamp;
      requestRef.current = requestAnimationFrame(animate);
    },
    [generateManifoldPoints, generatePath]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-gray-900">
      <svg
        id="manifold-svg"
        className="w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="manifoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#bfdbfe", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#111827", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#1d4ed8", stopOpacity: 1 }}
            />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {Array.from({ length: U_RES + 1 + (V_RES + 1) }).map((_, i) => (
          <path
            key={i}
            fill="none"
            stroke="url(#manifoldGrad)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
        ))}
      </svg>
    </div>
  );
};

export default ManifoldBackground;
