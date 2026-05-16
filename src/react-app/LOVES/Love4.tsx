import { useEffect, useRef, useState } from "react";

export default function Love4() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resizeCanvas() {
      const parent = canvas.parentElement;

      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: any[] = [];

    class Particle {
      x: number;
      y: number;
      tx: number;
      ty: number;

      startX: number;
      startY: number;

      angle: number;
      radius: number;

      size: number;
      speed: number;
      opacity: number;

      progress: number;

      constructor(tx: number, ty: number, angle: number, radius: number) {
        this.x = canvas.width / 2 - 70;
        this.y = canvas.height / 2;

        this.startX = canvas.width / 2 - 70;
        this.startY = canvas.height / 2;

        this.tx = tx;
        this.ty = ty;

        this.angle = angle;
        this.radius = radius;

        // MÁS GRANDES
        this.size = Math.random() * 5 + 15;

        this.speed = Math.random() * 0.015 + 0.01;

        this.opacity = Math.random() * 0.25 + 0.75;

        this.progress = 0;
      }

      draw() {
        ctx.save();

        ctx.font = `bold ${this.size}px Arial`;

        ctx.fillStyle = `rgba(255,190,220,${this.opacity})`;

        ctx.shadowColor = "#ff5fa2";
        ctx.shadowBlur = 14;

        ctx.fillText("I love you", this.x, this.y);

        ctx.restore();
      }

      update() {
        this.progress += this.speed;

        if (this.progress > 1) this.progress = 1;

        const spiral =
          (1 - this.progress) * this.radius;

        const swirlX =
          Math.cos(this.angle + this.progress * 10) *
          spiral;

        const swirlY =
          Math.sin(this.angle + this.progress * 10) *
          spiral;

        this.x =
          this.startX +
          (this.tx - this.startX) * this.progress +
          swirlX;

        this.y =
          this.startY +
          (this.ty - this.startY) * this.progress +
          swirlY;

        this.draw();
      }
    }

    function createHeart() {
      particles.length = 0;

      // MÁS A LA IZQUIERDA PARA CENTRAR VISUALMENTE
      const centerX = canvas.width / 2 - 70;

      const centerY = canvas.height / 2;

      // CORAZÓN MÁS GRANDE
      const scale =
        Math.min(canvas.width, canvas.height) * 0.032;

      // MENOS PARTÍCULAS = MÁS ESPACIO ENTRE TEXTOS
      const total = 115;

      for (let i = 0; i < total; i++) {
        const t = (i / total) * Math.PI * 2;

        const heartX =
          16 * Math.pow(Math.sin(t), 3);

        const heartY =
          -(13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t));

        const tx = centerX + heartX * scale;
        const ty = centerY + heartY * scale;

        const angle = Math.random() * Math.PI * 2;

        const radius =
          Math.random() * 250 + 100;

        particles.push(
          new Particle(tx, ty, angle, radius)
        );
      }
    }

    createHeart();

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (started) {
        particles.forEach((p) => p.update());
      }

      // TEXTO CENTRAL
      ctx.save();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const mainTextSize =
        Math.min(canvas.width, canvas.height) * 0.075;

      ctx.font = `bold ${mainTextSize}px Arial`;

      ctx.fillStyle = "#ffffff";

      ctx.shadowColor = "#ff2e88";
      ctx.shadowBlur = 40;

      ctx.fillText(
        "I LOVE YOU",
        canvas.width / 2 - 70,
        canvas.height / 2
      );

      ctx.restore();

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [started]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {!started && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            zIndex: 10,
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "16px",
              letterSpacing: "2px",
            }}
          >
            HAZ CLICK PARA COMENZAR
          </span>

          <button
            onClick={() => setStarted(true)}
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "50%",
              border: "2px solid #ff2e63",
              background: "rgba(255,0,80,0.08)",
              color: "white",
              fontSize: "35px",
              cursor: "pointer",
              boxShadow: "0 0 35px #ff2e88",
            }}
          >
            ♡
          </button>
        </div>
      )}
    </div>
  );
}