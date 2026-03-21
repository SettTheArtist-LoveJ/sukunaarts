import { useEffect, useRef } from "react";

export default function CorazonParticulas() {
  const bgRef = useRef<HTMLCanvasElement | null>(null);
  const heartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const backgroundCanvas = bgRef.current!;
    const heartCanvas = heartRef.current!;
    const bgCtx = backgroundCanvas.getContext("2d")!;
    const ctx = heartCanvas.getContext("2d")!;

    let isMobile = window.innerWidth <= 768;

    const config = {
      heart: {
        particleCount: 800,
        scaleFactor: 0.35,
        scaleFactorDesktop: 0.25,
        particleSizeMin: 1.5,
        particleSizeRange: 2.5,
        trembleAmplitude: 3,
        orbitRadius: 3,
        orbitSpeedMin: 0.03,
        orbitSpeedRange: 0.05,
        densityMin: 1,
        densityRange: 20,
      },
      text: {
        particleCount: 150,
        fontSizeMobile: 0.11,
        fontSizeDesktop: 0.08,
        particleSizeMin: 0.8,
        particleSizeRange: 1.2,
        trembleAmplitude: 2,
        orbitRadius: 2,
        orbitSpeedMin: 0.03,
        orbitSpeedRange: 0.05,
        densityMin: 1,
        densityRange: 20,
      },
      mouse: { radius: 100 },
    };

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;

      const width = window.innerWidth;
      const height = window.innerHeight;

      backgroundCanvas.width = width * dpr;
      backgroundCanvas.height = height * dpr;
      heartCanvas.width = width * dpr;
      heartCanvas.height = height * dpr;

      backgroundCanvas.style.width = width + "px";
      backgroundCanvas.style.height = height + "px";
      heartCanvas.style.width = width + "px";
      heartCanvas.style.height = height + "px";

      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();

    const particles: any[] = [];
    const stars: any[] = [];

    const getScaleFactor = () =>
      Math.min(window.innerWidth, window.innerHeight) / 600;

    let scaleFactor = getScaleFactor();

    const mouse = {
      x: 0,
      y: 0,
      radius: config.mouse.radius * scaleFactor,
    };

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random();
        this.speed = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.opacity += this.speed;
        if (this.opacity >= 1 || this.opacity <= 0) this.speed *= -1;
        this.draw();
      }

      draw() {
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        bgCtx.fill();
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      const touch = e.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
    }

    function handleResize() {
      resizeCanvas();
      isMobile = window.innerWidth <= 768;
      scaleFactor = getScaleFactor();
      mouse.radius = config.mouse.radius * scaleFactor;
      init();
    }

    heartCanvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("resize", handleResize);

    function drawBackground() {
      bgCtx.fillStyle = "black";
      bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
      stars.forEach((star) => star.update());
    }

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;

        this.size =
          (Math.random() * 2 + 1.5) * scaleFactor;

        this.density = Math.random() * 20 + 1;

        this.color = `hsl(${345 + Math.random() * 10},100%,70%)`;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          this.x -= (dx / distance) * 2;
          this.y -= (dy / distance) * 2;
        } else {
          this.x += (this.baseX - this.x) / 10;
          this.y += (this.baseY - this.y) / 10;
        }

        this.draw();
      }
    }

    function init() {
      particles.length = 0;
      stars.length = 0;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const scale =
        Math.min(window.innerWidth, window.innerHeight) *
        (isMobile
          ? config.heart.scaleFactor
          : config.heart.scaleFactorDesktop);

      for (let i = 0; i < config.heart.particleCount; i++) {
        const t = Math.random() * Math.PI * 2;

        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
          -(13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t));

        particles.push(
          new Particle(
            centerX + (x * scale) / 16,
            centerY + (y * scale) / 16
          )
        );
      }

      for (let i = 0; i < 150; i++) {
        stars.push(new Star());
      }
    }

    let animationId: number;

    function animate() {
      drawBackground();
      ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      heartCanvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <canvas ref={bgRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 1 }} />
      <canvas ref={heartRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 2 }} />
    </>
  );
}