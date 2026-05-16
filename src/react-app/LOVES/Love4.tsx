import { useEffect, useRef, useState } from "react";

export default function Love4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let particles: Particle[] = [];

    // AJUSTE VISUAL DEL CORAZÓN
    const offsetX = -55;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;

      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;

      createHeart();
    };

    class Particle {
      x: number;
      y: number;

      size: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        // MÁS PEQUEÑOS
        this.size = Math.random() * 2 + 9;
      }

      draw() {
        ctx.save();

        ctx.font = `bold ${this.size}px Arial`;

        // ROJO NEÓN
        ctx.fillStyle = "#ff3b3b";

        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 18;

        ctx.fillText(
          "I love you",
          this.x,
          this.y
        );

        ctx.restore();
      }
    }

    function createHeart() {
      particles = [];

      const centerX =
        canvas.width / 2 + offsetX;

      const centerY = canvas.height / 2;

      const scale =
        Math.min(
          canvas.width,
          canvas.height
        ) * 0.028;

      const total = 120;

      for (let i = 0; i < total; i++) {
        const t =
          (i / total) * Math.PI * 2;

        const x =
          16 * Math.pow(Math.sin(t), 3);

        const y =
          -(
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)
          );

        particles.push(
          new Particle(
            centerX + x * scale,
            centerY + y * scale
          )
        );
      }
    }

    function animate() {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.fillStyle = "#000";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      if (started) {
        particles.forEach((p) => p.draw());
      }

      // TEXTO CENTRAL
      ctx.save();

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textSize =
        Math.min(
          canvas.width,
          canvas.height
        ) * 0.075;

      ctx.font = `bold ${textSize}px Arial`;

      ctx.fillStyle = "#ffffff";

      // EFECTO NEÓN ROJO
      ctx.shadowColor = "#ff0000";
      ctx.shadowBlur = 45;

      ctx.fillText(
        "I LOVE YOU",
        canvas.width / 2 - 25,
        canvas.height / 2
      );

      ctx.restore();

      requestAnimationFrame(animate);
    }

    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    animate();

    return () =>
      window.removeEventListener(
        "resize",
        resizeCanvas
      );
  }, [started]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
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
            bottom: 40,
            left: "50%",
            transform:
              "translateX(-50%)",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
          }}
        >
          <span
            style={{
              color: "#fff",
              letterSpacing: 2,
            }}
          >
            HAZ CLICK PARA COMENZAR
          </span>

          <button
            onClick={() =>
              setStarted(true)
            }
            style={{
              width: 75,
              height: 75,
              borderRadius: "50%",
              border:
                "2px solid #ff0000",

              background:
                "rgba(255,0,0,.08)",

              color: "#fff",
              fontSize: 35,
              cursor: "pointer",

              boxShadow:
                "0 0 35px #ff0000",
            }}
          >
            ♡
          </button>
        </div>
      )}
    </div>
  );
}