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

    let animationId = 0;

    let frame = 0;

    const resizeCanvas = () => {
      canvas.width =
        window.innerWidth;

      canvas.height =
        window.innerHeight;

      createHeart();
    };

    class Particle {
      x: number;
      y: number;
      opacity = 0;
      delay: number;

      constructor(
        x: number,
        y: number,
        delay: number
      ) {
        this.x = x;
        this.y = y;
        this.delay = delay;
      }

      draw(frame: number) {
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

        ctx.shadowBlur = 25;

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
        canvas.width / 2;

      const centerY =
        canvas.height / 2;

      const scale =
        Math.min(
          canvas.width,
          canvas.height
        ) * 0.018;

      const total = 500;

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
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)
          );

        particles.push(
          new Particle(
            centerX +
              x * scale +
              (Math.random() - 0.5) * 8,

            centerY +
              y * scale +
              (Math.random() - 0.5) * 8,

            i * 2
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

      ctx.fillStyle = "black";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      frame++;

      particles.forEach((p) =>
        p.draw(frame)
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
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}