'use client'
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const blobs: { color: string; side: "left" | "right" }[] = [
  { color: "bg-test-blue", side: "left" },
  { color: "bg-test-green", side: "right" },
];

const getRandomPosition = (side: "left" | "right", halfWidth: number, height: number) => ({
  x: side === "left" ? Math.random() * halfWidth - halfWidth : Math.random() * halfWidth,
  y: Math.random() * height - height / 2,
});

export function Background() {
  const controlsArrayRef = useRef(blobs.map(() => useAnimation()));
  const controlsArray = controlsArrayRef.current;
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Track if client mounted
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!mounted) return; // only animate after mount

    let isMounted = true;
    const halfWidth = windowSize.width / 2;
    const height = windowSize.height;

    controlsArray.forEach((controls, i) => {
      controls.set(getRandomPosition(blobs[i].side, halfWidth, height));
      (async function animate() {
        while (isMounted) {
          const allowCrossover = Math.random() < 0.3;
          const side = blobs[i].side;
          let xRange: [number, number];

          if (allowCrossover) {
            xRange = [-halfWidth * 0.2, halfWidth * 0.2];
          } else if (side === "left") {
            xRange = [-halfWidth, 0];
          } else {
            xRange = [0, halfWidth];
          }

          const x = xRange[0] + Math.random() * (xRange[1] - xRange[0]);
          const y = Math.random() * height - height / 2;

          if (!isMounted) break;

          await controls.start({
            x,
            y,
            transition: { duration: 6, ease: "easeInOut" },
          });
        }
      })();
    });

    return () => {
      isMounted = false;
    };
  }, [mounted, controlsArray, windowSize]);

  const blobSize = Math.min(windowSize.width * 0.4, 650);

  if (!mounted) {
    // Render fallback to avoid hydration mismatch
    return <div className="fixed inset-0 -z-10 overflow-hidden blur-[250px]" />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden blur-[250px]">
      {blobs.map(({ color }, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${color} opacity-40`}
          style={{
            width: blobSize,
            height: blobSize,
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={controlsArray[i]}
        />
      ))}
    </div>
  );
}