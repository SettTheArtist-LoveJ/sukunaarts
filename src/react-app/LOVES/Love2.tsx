import { useState, useEffect } from "react";

export default function Love2() {
  const [started, setStarted] = useState(false);
  const [bubbles, setBubbles] = useState<
    { id: number; size: number; left: number; duration: number; delay: number; sway: number; curve: number }[]
  >([]);

  useEffect(() => {
    if (started) {
      const initialBubbles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        size: Math.random() * 12 + 6,
        left: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
        sway: Math.random() * 20 - 10,
        curve: Math.random() * 30 - 15,
      }));
      setBubbles(initialBubbles);

      const interval = setInterval(() => {
        const newBubble = {
          id: Date.now(),
          size: Math.random() * 12 + 6,
          left: Math.random() * 100,
          duration: 4 + Math.random() * 4,
          delay: 0,
          sway: Math.random() * 20 - 10,
          curve: Math.random() * 30 - 15,
        };
        setBubbles((prev) => [...prev, newBubble].slice(-60));
      }, 400);

      return () => clearInterval(interval);
    }
  }, [started]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
      }}
    >

      {/* OVERLAY INICIAL */}
      {!started && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            cursor: "pointer",
          }}
          onClick={() => setStarted(true)}
        >
          <h2
            style={{
              color: "white",
              marginBottom: "20px",
              fontSize: "2rem",
              textShadow: "0 0 8px #fff",
              fontFamily: "'Brush Script MT', cursive"
            }}
          >
            TOCA PARA ABRIR
          </h2>

          <img
            src="https://www.dropbox.com/scl/fi/cmqvcdkq1ddgvhzwk2pn6/image.png?rlkey=79mreuh53xqegx80hy6drn77p&raw=1"
            alt="Abrime"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </div>
      )}

      {/* FONDO OCEÁNICO */}
      {started && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, #001f3f, #004080, #0077be)",
            zIndex: 0,
          }}
        ></div>
      )}

      {/* FLORES (Index.html) */}
      {started && (
        <iframe
          src="/Item/index.html"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
            zIndex: 1
          }}
        />
      )}
      {started && (
  <div
    style={{
      position: "absolute",
      top: "5vh", // 👈 relativo a pantalla
      left: "4vw",
      color: "white",
      fontSize: "clamp(1.2rem, 4vw, 3rem)", // 👈 clave 🔥
      fontFamily: "'Brush Script MT', cursive",
      textShadow: "0 0 10px #ff6bb3, 0 0 20px #ff6bb3",
      zIndex: 3,
      lineHeight: "1.2"
    }}
  >
    flores para ti mi amor <br /> 💖
  </div>
)}
{started && (
  <img
    src="/Item/paraisolove.png"
    alt="foto"
    style={{
      position: "absolute",
      top: "5vh",
      right: "5vw",

      width: "25vw",        // 🔥 se adapta al ancho de pantalla
      height: "25vw",

      maxWidth: "220px",    // límite en PC
      maxHeight: "220px",

      minWidth: "100px",     // límite en celulares pequeños
      minHeight: "100px",

      borderRadius: "50%",
      objectFit: "cover",

      border: "3px solid white",
      boxShadow: "0 0 15px #ff6bb3",

      zIndex: 3
    }}
  />
)}
      {/* BURBUJAS */}
      {started &&
        bubbles.map((b) => (
          <div
            key={b.id}
            style={{
              position: "absolute",
              bottom: "-20px",
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.6)",
              animation: `rise-${b.id} ${b.duration}s linear forwards`,
              animationDelay: `${b.delay}s`,
              zIndex: 2,
              "--sway": `${b.sway}px`,
              "--curve": `${b.curve}px`,
            } as any}
          ></div>
        ))}

      {/* ANIMACIONES CSS DINÁMICAS */}
      <style>
        {`
          ${bubbles.map(
            (b) => `
              @keyframes rise-${b.id} {
                0% {
                  bottom: -20px;
                  transform: translateX(0px);
                  opacity: 0;
                }
                25% {
                  bottom: 25%;
                  transform: translateX(var(--sway)) translateY(0px) translateX(var(--curve));
                  opacity: 0.5;
                }
                50% {
                  bottom: 50%;
                  transform: translateX(calc(var(--sway) * -0.5)) translateX(calc(var(--curve) * 0.5));
                  opacity: 0.7;
                }
                75% {
                  bottom: 75%;
                  transform: translateX(calc(var(--sway) * 0.7)) translateX(calc(var(--curve) * -0.3));
                  opacity: 0.8;
                }
                100% {
                  bottom: 100%;
                  transform: translateX(0px);
                  opacity: 0;
                }
              }
            `
          ).join("\n")}
        `}
      </style>

    </div>
  );
}