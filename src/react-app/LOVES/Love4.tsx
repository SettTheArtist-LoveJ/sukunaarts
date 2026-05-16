import { useEffect, useRef } from "react";

export default function LoveHeart() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas =
      canvasRef.current!;

    const ctx =
      canvas.getContext("2d")!;

    let particles: Particle[] = [];

    let frame = 0;

    let animationId = 0;

    // MISMO MÉTODO DE CENTRADO
    // QUE TU CÓDIGO ORIGINAL
    const offsetX = -55;

    const resizeCanvas = () => {
      const parent =
        canvas.parentElement;

      if (!parent) return;

      canvas.width =
        parent.clientWidth;

      canvas.height =
        parent.clientHeight;

      createHeart();
    };

    class Particle {
      x: number;
      y: number;

      delay: number;

      opacity = 0;

      constructor(
        x: number,
        y: number,
        delay: number
      ) {
        // MISMO CUADREO
        // Y DISPERSIÓN
        this.x =
          x +
          (Math.random() - 0.5) * 6;

        this.y =
          y +
          (Math.random() - 0.5) * 6;

        this.delay = delay;
      }

      update(frame: number) {
        if (frame < this.delay)
          return;

        if (this.opacity < 1) {
          this.opacity += 0.02;
        }

        ctx.save();

        ctx.font =
          "bold 20px Arial";

        ctx.fillStyle = `rgba(255,182,193,${this.opacity})`;

        ctx.shadowColor = "#ff69b4";

        ctx.shadowBlur = 22;

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

      // MISMO CENTRADO
      const centerX =
        canvas.width / 2 + offsetX;

      const centerY =
        canvas.height / 2;

      // MISMO MÉTODO
      // DE ESCALADO
      const baseScale =
        Math.min(
          canvas.width,
          canvas.height
        ) * 0.028;

      const total = 260;

      const heartLayers = 5;

      for (
        let layer = 0;
        layer < heartLayers;
        layer++
      ) {
        const scale =
          baseScale *
          (1 - layer * 0.12);

        for (
          let sideIndex = 0;
          sideIndex < total / 2;
          sideIndex++
        ) {
          // MISMO MÉTODO
          // IZQUIERDA/DERECHA
          const leftT =
            (sideIndex / total) *
            Math.PI *
            2;

          const rightT =
            ((total - sideIndex) /
              total) *
            Math.PI *
            2;

          const sides = [
            leftT,
            rightT,
          ];

          sides.forEach((t) => {
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

            // MISMO CUADREO
            let randomOffset = 8;

            if (layer === 0) {
              randomOffset = 2;
            }

            // MISMA ANIMACIÓN
            const delay =
              layer * 30 +
              sideIndex * 1.2;

            particles.push(
              new Particle(
                centerX +
                  x * scale +
                  (Math.random() -
                    0.5) *
                    randomOffset,

                centerY +
                  y * scale +
                  (Math.random() -
                    0.5) *
                    randomOffset,

                delay
              )
            );
          });
        }
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

      // MISMO GLOW CENTRAL
      const glow =
        ctx.createRadialGradient(
          canvas.width / 2 +
            offsetX,

          canvas.height / 2,

          20,

          canvas.width / 2 +
            offsetX,

          canvas.height / 2,

          260
        );

      glow.addColorStop(
        0,
        "rgba(255,105,180,0.35)"
      );

      glow.addColorStop(
        0.4,
        "rgba(255,105,180,0.12)"
      );

      glow.addColorStop(
        1,
        "rgba(255,105,180,0)"
      );

      ctx.fillStyle = glow;

      ctx.beginPath();

      ctx.arc(
        canvas.width / 2 +
          offsetX,

        canvas.height / 2,

        260,

        0,
        Math.PI * 2
      );

      ctx.fill();

      frame += 2;

      particles.forEach((p) =>
        p.update(frame)
      );

      animationId =
        requestAnimationFrame(
          animate
        );
    }

    resizeCanvas();

    animate();

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
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
    </div>
  );
}