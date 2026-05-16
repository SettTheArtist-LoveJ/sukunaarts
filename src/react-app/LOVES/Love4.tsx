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

    let heartCompleted = false;

    ctx.textBaseline = "middle";

    // 🔥 ADAPTAR A CELULAR
    const resizeCanvas = () => {
      const dpr =
        window.devicePixelRatio || 1;

      canvas.width =
        window.innerWidth * dpr;

      canvas.height =
        window.innerHeight * dpr;

      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      ctx.scale(dpr, dpr);

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

        // 🔥 MÁS PEQUEÑO EN CELULAR
        this.size =
          window.innerWidth < 768
            ? Math.random() * 2 + 9
            : Math.random() * 2 + 16;
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
          window.innerHeight -
            bloodLevel
        ) {
        bloodLevel +=
  window.innerWidth < 768
    ? 2.2 // 📱 celular
    : 0.7; // 💻 pc

          if (
            bloodLevel >
            window.innerHeight
          ) {
            bloodLevel =
              window.innerHeight;
          }

          tears.splice(index, 1);
        }
      }
    }

    function createHeart() {
      particles = [];

      const centerX =
        window.innerWidth / 2;

      const centerY =
        window.innerHeight / 2;

      // 🔥 ESCALA RESPONSIVE
      const baseScale =
        window.innerWidth < 768
          ? Math.min(
              window.innerWidth,
              window.innerHeight
            ) * 0.022
          : Math.min(
              window.innerWidth,
              window.innerHeight
            ) * 0.035;

      // 🔥 MENOS TEXTO EN CELULAR
      const total =
        window.innerWidth < 768
          ? 45
          : 70;

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
        window.innerWidth,
        window.innerHeight
      );

      // FONDO
      ctx.fillStyle = "#000";

      ctx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      // LUZ
      const glow =
        ctx.createRadialGradient(
          window.innerWidth / 2,
          window.innerHeight / 2,
          0,
          window.innerWidth / 2,
          window.innerHeight / 2,
          window.innerWidth * 0.3
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
        window.innerWidth,
        window.innerHeight
      );

      // AGUA
      if (bloodLevel > 0) {
        const topY =
          window.innerHeight -
          bloodLevel;

        const gradient =
          ctx.createLinearGradient(
            0,
            topY,
            0,
            window.innerHeight
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
          window.innerHeight
        );

        ctx.lineTo(0, topY);

        for (
          let x = 0;
          x <= window.innerWidth;
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
          window.innerWidth,
          window.innerHeight
        );

        ctx.closePath();

        ctx.fillStyle = gradient;

        ctx.shadowBlur = 10;

        ctx.fill();
      }

      // CORAZÓN
      if (startedRef.current) {
        frame++;

        let visibleParticles = 0;

        particles.forEach((p) => {
          p.update(frame);

          if (p.active) {
            visibleParticles++;
          }
        });

        if (
          visibleParticles >=
          particles.length * 0.98
        ) {
          heartCompleted = true;
        }

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

      // TEXTO CENTRAL RESPONSIVE
      ctx.textAlign = "center";

      const textSize =
        window.innerWidth < 768
          ? 28
          : Math.min(
              window.innerWidth,
              window.innerHeight
            ) * 0.07;

      ctx.font = `bold ${textSize}px Arial`;

      ctx.fillStyle = "#fff";

      ctx.shadowColor = "#ff0000";

      ctx.shadowBlur = 15;

      ctx.fillText(
        "I LOVE YOU",
        window.innerWidth / 2,
        window.innerHeight / 2
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
        width: "100vw",
        height: "100vh",
        background: "#000",
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        touchAction: "none",
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

            bottom:
              window.innerWidth < 768
                ? 70
                : 40,

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

              fontSize:
                window.innerWidth < 768
                  ? 14
                  : 18,
            }}
          >
            TOCA EL CORAZÓN
          </span>

          <button
            onClick={() =>
              setStarted(true)
            }
            style={{
              width:
                window.innerWidth < 768
                  ? 65
                  : 75,

              height:
                window.innerWidth < 768
                  ? 65
                  : 75,

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              padding: 0,

              borderRadius: "50%",

              border:
                "2px solid #ff0000",

              background:
                "rgba(255,0,0,.08)",

              color: "#fff",

              fontSize:
                window.innerWidth < 768
                  ? 28
                  : 35,

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