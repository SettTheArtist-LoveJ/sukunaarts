import { useEffect, useRef, useState } from "react";

export default function Love4() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const [started, setStarted] =
    useState(false);

  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  useEffect(() => {
    const canvas = canvasRef.current!;

    const ctx = canvas.getContext("2d")!;

    let particles: Particle[] = [];

    let tears: Tear[] = [];

    let animationId = 0;

    let bloodLevel = 0;

    // NUEVO
    let heartCompleted = false;

    ctx.textBaseline = "middle";

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

      delay: number;

      opacity = 0;

      active = false;

      constructor(
        x: number,
        y: number,
        delay: number
      ) {
        this.x = x;
        this.y = y;
        this.delay = delay;

        this.size =
          Math.random() * 2 + 16;
      }

      update(frame: number) {
        if (frame < this.delay)
          return;

        this.active = true;

        if (this.opacity < 1) {
          this.opacity += 0.009;
        }

        ctx.font = `bold ${this.size}px Arial`;

        ctx.fillStyle = `rgba(255,60,60,${this.opacity})`;

        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 8;

        ctx.fillText(
          "I love you",
          this.x,
          this.y
        );
      }
    }

    class Tear {
      x: number;

      y: number;

      speed: number;

      size: number;

      opacity: number;

      constructor(
        x: number,
        y: number
      ) {
        this.x = x;
        this.y = y;

        this.speed =
          Math.random() * 1 + 2;  

        this.size =
          Math.random() * 3 + 4;

        this.opacity =
          Math.random() * 0.4 + 0.5;
      }

      update(index: number) {
        this.y += this.speed;

        ctx.beginPath();

        ctx.fillStyle = `rgba(255,0,0,${this.opacity})`;

        ctx.shadowBlur = 5;

        ctx.arc(
          this.x,
          this.y,
          this.size,
          0,
          Math.PI * 2
        );

        ctx.fill();

        if (
          this.y >=
          canvas.height - bloodLevel
        ) {
          bloodLevel += 0.7;

          if (
            bloodLevel >
            canvas.height
          ) {
            bloodLevel =
              canvas.height;
          }

          tears.splice(index, 1);
        }
      }
    }

    function createHeart() {
      particles = [];

      const centerX =
        canvas.width / 2;

      const centerY =
        canvas.height / 2;

      const baseScale =
        Math.min(
          canvas.width,
          canvas.height
        ) * 0.035;

      const total = 70;

      const heartLayers = 3;

      for (
        let layer = 0;
        layer < heartLayers;
        layer++
      ) {
        const scale =
          baseScale *
          (1 - layer * 0.2);

        for (
          let i = 0;
          i < total;
          i++
        ) {
          const t =
            (i / total) *
            Math.PI *
            2;

          const x =
            16 *
            Math.pow(
              Math.sin(t),
              3
            );

          const y =
            -(
              13 * Math.cos(t) -
              5 *
                Math.cos(2 * t) -
              2 *
                Math.cos(3 * t) -
              Math.cos(4 * t)
            );

          particles.push(
            new Particle(
              centerX + x * scale,
              centerY + y * scale,
              Math.random() * 80 +
                layer * 20
            )
          );
        }
      }
    }

    let frame = 0;

    function animate() {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // FONDO
      ctx.fillStyle = "#000";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // LUZ
      const glow =
        ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width * 0.3
        );

      glow.addColorStop(
        0,
        "rgba(255,0,0,0.18)"
      );

      glow.addColorStop(
        1,
        "rgba(255,0,0,0)"
      );

      ctx.fillStyle = glow;

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // AGUA
      if (bloodLevel > 0) {
        const topY =
          canvas.height -
          bloodLevel;

        const gradient =
          ctx.createLinearGradient(
            0,
            topY,
            0,
            canvas.height
          );

        gradient.addColorStop(
          0,
          "rgba(255,30,30,0.8)"
        );

        gradient.addColorStop(
          1,
          "rgba(100,0,0,1)"
        );

        ctx.beginPath();

        ctx.moveTo(
          0,
          canvas.height
        );

        ctx.lineTo(0, topY);

        for (
          let x = 0;
          x <= canvas.width;
          x += 20
        ) {
          const wave =
            Math.sin(
              x * 0.015 +
                frame * 0.04
            ) * 8;

          ctx.lineTo(
            x,
            topY + wave
          );
        }

        ctx.lineTo(
          canvas.width,
          canvas.height
        );

        ctx.closePath();

        ctx.fillStyle = gradient;

        ctx.shadowBlur = 10;

        ctx.fill();

        // REFLEJO
        ctx.beginPath();

        for (
          let x = 0;
          x <= canvas.width;
          x += 20
        ) {
          const wave =
            Math.sin(
              x * 0.015 +
                frame * 0.04
            ) * 8;

          if (x === 0) {
            ctx.moveTo(
              x,
              topY + wave
            );
          } else {
            ctx.lineTo(
              x,
              topY + wave
            );
          }
        }

        ctx.strokeStyle =
          "rgba(255,255,255,0.15)";

        ctx.lineWidth = 1;

        ctx.stroke();
      }

      // CORAZON
      if (startedRef.current) {
        frame++;

        let visibleParticles = 0;

        particles.forEach((p) => {
          p.update(frame);

          if (p.active) {
            visibleParticles++;
          }
        });

        // CUANDO TERMINA DE FORMARSE
        if (
          visibleParticles >=
          particles.length * 0.98
        ) {
          heartCompleted = true;
        }

        // GOTAS SOLO DESPUES
        if (heartCompleted) {
          particles.forEach((p) => {
            if (
              Math.random() <
                0.004 &&
              Math.random() < 0.4
            ) {
              tears.push(
                new Tear(
                  p.x + 20,
                  p.y
                )
              );
            }
          });
        }
      }

      // GOTAS
      for (
        let i =
          tears.length - 1;
        i >= 0;
        i--
      ) {
        tears[i].update(i);
      }

      // TEXTO CENTRAL
      ctx.textAlign = "center";

      const textSize =
        Math.min(
          canvas.width,
          canvas.height
        ) * 0.07;

      ctx.font = `bold ${textSize}px Arial`;

      ctx.fillStyle = "#fff";

      ctx.shadowColor = "#ff0000";

      ctx.shadowBlur = 15;

      ctx.fillText(
        "I LOVE YOU",
        canvas.width / 2,
        canvas.height / 2
      );

      animationId =
        requestAnimationFrame(
          animate
        );
    }

    resizeCanvas();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    animate();

    return () => {
      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      cancelAnimationFrame(
        animationId
      );
    };
  }, []);

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

            flexDirection:
              "column",

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
            DALE CLICK

          </span>

<button
  onClick={() =>
    setStarted(true)
  }
  style={{
    width: 75,
    height: 75,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: 0,

    borderRadius: "50%",

    border:
      "2px solid #ff0000",

    background:
      "rgba(255,0,0,.08)",

    color: "#fff",

    fontSize: 35,
    lineHeight: 1,

    cursor: "pointer",

    boxShadow:
      "0 0 20px #ff0000",
  }}
>
  ♡
</button>
        </div>
      )}
    </div>
  );
}