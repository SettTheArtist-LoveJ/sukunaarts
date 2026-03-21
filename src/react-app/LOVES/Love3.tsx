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
      background: {
        waveSpeed: 0.001,
        waveAmplitude: 0.4,
        secondaryWaveSpeed: 0.0008,
        secondaryWaveAmplitude: 0.3,
        redIntensity: 0.3,
      },
    };

function resizeCanvas() {
  const rect = heartCanvas.parentElement!.getBoundingClientRect();

  const dpr = window.devicePixelRatio || 1;

  // Tamaño real (resolución interna)
  backgroundCanvas.width = rect.width * dpr;
  backgroundCanvas.height = rect.height * dpr;
  heartCanvas.width = rect.width * dpr;
  heartCanvas.height = rect.height * dpr;

  // Tamaño visual (CSS)
  backgroundCanvas.style.width = rect.width + "px";
  backgroundCanvas.style.height = rect.height + "px";
  heartCanvas.style.width = rect.width + "px";
  heartCanvas.style.height = rect.height + "px";

  // Escalado correcto
  bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
    resizeCanvas();

    const particles: any[] = [];
    const isMobile = heartCanvas.width <= 768;

    const rect = heartCanvas.getBoundingClientRect();
     const scaleFactor =
      Math.min(rect.width, rect.height) / 600;
    
    const mouse = {
      x: 0,
      y: 0,
      radius: config.mouse.radius * scaleFactor,
    };

    // ✅ EVENTOS CORRECTOS
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
  bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

  const rect = backgroundCanvas.getBoundingClientRect();

  const time = Date.now() * 0.00014;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const maxDist = Math.hypot(centerX, centerY);

  // 🔥 más pequeño = más suave
  const step = 4;

  for (let x = 0; x < rect.width; x += step) {
    for (let y = 0; y < rect.height; y += step) {
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.hypot(dx, dy);

      // 🔥 normalizamos distancia (0 centro → 1 bordes)
      const normalized = dist / maxDist;

      // 🌊 onda que viene desde bordes hacia el centro
      const wave = Math.sin(10 * normalized + time * 4);

      // 🔴 SOLO aparece en la onda (lo demás queda negro)
      const intensity = Math.pow(Math.max(0, wave), 2);

      // ✨ se desvanece al llegar al centro
      const fade = normalized;

      const red = intensity * fade * 255;

      bgCtx.fillStyle = `rgb(${red}, 0, 0)`;
      bgCtx.fillRect(x, y, step, step);
    }
  }
}

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;
      isTextParticle: boolean;
      color: string;
      trembleOffset: number;
      trembleSpeed: number;
      trembleAmplitude: number;
      orbitOffset: number;
      orbitSpeed: number;
      orbitRadius: number;

      constructor(x: number, y: number, isText = false) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.isTextParticle = isText;

        const cfg = isText ? config.text : config.heart;

        this.size =
          (Math.random() * cfg.particleSizeRange + cfg.particleSizeMin) *
          scaleFactor;

        this.density =
          Math.random() * cfg.densityRange + cfg.densityMin;

        this.color = isText
          ? `hsl(${350 + Math.random() * 20},100%,90%)`
          : `hsl(${345 + Math.random() * 10},100%,70%)`;

        this.trembleOffset = Math.random() * Math.PI * 2;
        this.trembleSpeed = Math.random() * 0.1 + 0.06;
        this.trembleAmplitude = cfg.trembleAmplitude * scaleFactor;

        this.orbitOffset = Math.random() * Math.PI * 2;
        this.orbitSpeed =
          Math.random() * cfg.orbitSpeedRange + cfg.orbitSpeedMin;
        this.orbitRadius = cfg.orbitRadius * scaleFactor;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        const time = Date.now() * 0.001;

        const trembleX =
          Math.sin(time * this.trembleSpeed + this.trembleOffset) *
          this.trembleAmplitude;
        const trembleY =
          Math.cos(time * this.trembleSpeed + this.trembleOffset) *
          this.trembleAmplitude;

        const orbitX =
          Math.sin(time * this.orbitSpeed + this.orbitOffset) *
          this.orbitRadius;
        const orbitY =
          Math.cos(time * this.orbitSpeed + this.orbitOffset) *
          this.orbitRadius;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);

        const force = (mouse.radius - distance) / mouse.radius;

        const targetX = this.baseX + trembleX + orbitX;
        const targetY = this.baseY + trembleY + orbitY;

        if (distance < mouse.radius) {
          this.x -= (dx / distance) * force * this.density;
          this.y -= (dy / distance) * force * this.density;
        } else {
          this.x += (targetX - this.x) / 8;
          this.y += (targetY - this.y) / 8;
        }

        this.draw();
      }
    }

    function createTextParticles() {
      const rect = heartCanvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const text = "Te amo ❤️";

      const fontSize =
        Math.min(heartCanvas.width, heartCanvas.height) *
        (isMobile ? config.text.fontSizeMobile : config.text.fontSizeDesktop);

      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d")!;

      tempCanvas.width = heartCanvas.width;
      tempCanvas.height = heartCanvas.height;

      tempCtx.font = `bold ${fontSize}px Arial`;
      tempCtx.fillStyle = "white";
      tempCtx.textAlign = "center";
      tempCtx.textBaseline = "middle";

      tempCtx.fillText(text, centerX, centerY);

      const data = tempCtx.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      ).data;

      for (let y = 0; y < tempCanvas.height; y += 2) {
        for (let x = 0; x < tempCanvas.width; x += 2) {
          const i = (y * tempCanvas.width + x) * 4;
          if (data[i + 3] > 128) {
            particles.push(new Particle(x, y, true));
          }
        }
      }
    }

    function init() {
      particles.length = 0;
         const rect = heartCanvas.getBoundingClientRect();
         const centerX = rect.width / 2;
         const centerY = rect.height / 2;

      const scale =
        Math.min(heartCanvas.width, heartCanvas.height) *
        (isMobile
          ? config.heart.scaleFactor
          : config.heart.scaleFactorDesktop) * 1.3;

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

      createTextParticles();
    }

    // ✅ ANIMACIÓN CORREGIDA
    let animationId: number;

    function animate() {
      drawBackground();
      ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

      particles.forEach((p) => p.update());

      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    // ✅ LIMPIEZA (LA CLAVE DEL LAG)
    return () => {
      cancelAnimationFrame(animationId);
      heartCanvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  return (
    <>
      <canvas ref={bgRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }} />
      <canvas ref={heartRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2 }} />
    </>
  );
}