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
      size: number;
      speed: number;
      opacity: number;

      constructor(tx: number, ty: number) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.tx = tx;
        this.ty = ty;

        this.size = Math.random() * 8 + 8;
        this.speed = Math.random() * 0.03 + 0.015;
        this.opacity = Math.random() * 0.5 + 0.5;
      }

      draw() {
        ctx.save();

        ctx.font = `${this.size}px Arial`;
        ctx.fillStyle = `rgba(255,70,120,${this.opacity})`;

        ctx.fillText("I LOVE YOU", this.x, this.y);

        ctx.restore();
      }

      update() {
        this.x += (this.tx - this.x) * this.speed;
        this.y += (this.ty - this.y) * this.speed;

        this.draw();
      }
    }

    function createHeart() {
      particles.length = 0;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 20;

      const scale = Math.min(canvas.width, canvas.height) * 0.018;

      for (let i = 0; i < 900; i++) {
        const t = Math.random() * Math.PI * 2;

        const heartX = 16 * Math.pow(Math.sin(t), 3);

        const heartY =
          -(13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t));

        const tx = centerX + heartX * scale;
        const ty = centerY + heartY * scale;

        particles.push(new Particle(tx, ty));
      }
    }

    createHeart();

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (started) {
        particles.forEach((p) => p.update());
      }

      ctx.save();

      ctx.textAlign = "center";

      const mainTextSize = Math.min(canvas.width, canvas.height) * 0.08;

      ctx.font = `bold ${mainTextSize}px Arial`;
      ctx.fillStyle = "white";

      ctx.fillText(
        "I LOVE YOU",
        canvas.width / 2,
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
              background: "rgba(255,0,80,0.1)",
              color: "white",
              fontSize: "35px",
              cursor: "pointer",
              boxShadow: "0 0 25px #ff2e63",
            }}
          >
            ♡
          </button>
        </div>
      )}
    </div>
  );
}