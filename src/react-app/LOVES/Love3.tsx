import { useEffect, useRef } from "react";

export default function CorazonParticulas() {
  const bgRef = useRef<HTMLCanvasElement | null>(null);
  const heartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const backgroundCanvas = bgRef.current!;
    const heartCanvas = heartRef.current!;
    const bgCtx = backgroundCanvas.getContext("2d")!;
    const ctx = heartCanvas.getContext("2d")!;

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
        pixelStepMobile: 1.2,
        pixelStepDesktop: 1.8,
        densityMin: 1,
        densityRange: 20,
      },
      mouse: { radius: 100 },
    };

    function resizeCanvas() {
      const parent = heartCanvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();

      // 🔥 evita bug en móvil cuando aún no hay tamaño
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;

      backgroundCanvas.width = rect.width * dpr;
      backgroundCanvas.height = rect.height * dpr;
      heartCanvas.width = rect.width * dpr;
      heartCanvas.height = rect.height * dpr;

      backgroundCanvas.style.width = rect.width + "px";
      backgroundCanvas.style.height = rect.height + "px";
      heartCanvas.style.width = rect.width + "px";
      heartCanvas.style.height = rect.height + "px";

      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resizeCanvas();

    const particles: any[] = [];
    const stars: any[] = [];

    const isMobile = window.innerWidth <= 768; // 🔥 mejor que antes

    const rect = heartCanvas.getBoundingClientRect();
    const scaleFactor = Math.min(rect.width, rect.height) / 600;

    const mouse = {
      x: 0,
      y: 0,
      radius: config.mouse.radius * scaleFactor,
    };

    class Star {
      constructor(
        public x = Math.random() * backgroundCanvas.width,
        public y = Math.random() * backgroundCanvas.height,
        public size = Math.random() * 1.5 + 0.5,
        public opacity = Math.random(),
        public speed = Math.random() * 0.02 + 0.005
      ) {}

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
      const rect = heartCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handleTouchMove(e: TouchEvent) {
      const rect = heartCanvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouse.x = touch.clientX - rect.left;
      mouse.y = touch.clientY - rect.top;
    }

    function handleResize() {
      resizeCanvas();
      init();
    }

    heartCanvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", handleResize);

    function drawBackground() {
      bgCtx.fillStyle = "black";
      bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
      stars.forEach((star) => star.update());
    }

    class Particle {
      constructor(public x: number, public y: number) {
        this.baseX = x;
        this.baseY = y;
        this.size = (Math.random() * 2 + 1.5) * scaleFactor;
        this.density = Math.random() * 20 + 1;
        this.color = `hsl(${345 + Math.random() * 10},100%,70%)`;
      }

      baseX: number;
      baseY: number;
      size: number;
      density: number;
      color: string;

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

        const force = (mouse.radius - distance) / mouse.radius;

        if (distance < mouse.radius) {
          this.x -= (dx / distance) * force * this.density;
          this.y -= (dy / distance) * force * this.density;
        } else {
          this.x += (this.baseX - this.x) / 8;
          this.y += (this.baseY - this.y) / 8;
        }

        this.draw();
      }
    }

    function init() {
      particles.length = 0;
      stars.length = 0;

      const rect = heartCanvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const scale = Math.min(rect.width, rect.height) * 0.3;

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

      for (let i = 0; i < 150; i++) stars.push(new Star());
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

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "50vh", // 🔥 más equilibrado que 60vh
        position: "relative",
        overflow: "hidden", // 🔥 como Love2
        borderRadius: "20px",
      }}
    >
      <canvas ref={bgRef} style={{ position: "absolute", inset: 0 }} />
      <canvas ref={heartRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}