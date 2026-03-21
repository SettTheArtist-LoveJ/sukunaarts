import { useState } from "react";
import Love1 from "./LOVES/Love1";
import Love2 from "./LOVES/Love2";
import Love3 from "./LOVES/Love3";

export default function Secret() {
  const [date, setDate] = useState("");
  const [access, setAccess] = useState(false);
  const [openBox, setOpenBox] = useState<number | null>(null);

  const secretDate = "2022-05-31";

  function checkPassword() {
    if (date === secretDate) {
      setAccess(true);
    } else {
      alert("Fecha incorrecta");
    }
  }

  if (access) {
    return (
      <div
        style={{
          backgroundColor: "#ffd6e7",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "#ff6fa3",
            marginBottom: "40px",
          }}
        >
          LOVE 💖
        </h1>

        {/* CUADROS RESPONSIVOS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              onClick={() => setOpenBox(num)}
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                backgroundColor: "#fff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(1rem, 4vw, 1.5rem)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
{num === 1 ? (
  <img
    src="/tequiero1.png"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "12px",
    }}
  />
) : num === 2 ? (
  <img
    src="/tequiero2.png" // 👈 tu imagen del cuadro 2
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "12px",
    }}
  />
) : num === 3 ? (
  <img
    src="/tequiero3.png" // 👈 tu imagen del cuadro 3
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "12px",
    }}
  />
) : (
  <>Cuadro {num}</>
)}
            </div>
          ))}
        </div>

        {/* VENTANA GRANDE RESPONSIVA */}
        {openBox !== null && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: window.innerWidth < 600 ? "95vw" : "95vw",
                height: window.innerWidth < 600 ? "auto" : "90vh",
                aspectRatio: window.innerWidth < 600 ? "1 / 1" : "auto",
                maxWidth: window.innerWidth < 600 ? "500px" : "900px",
                borderRadius: "20px",
                padding: "25px",
                position: "relative",
                overflow: "auto",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              <button
                onClick={() => setOpenBox(null)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  zIndex: 9999,
                  backgroundColor: "#ff6fa3",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Salir
              </button>

              {openBox === 1 && <Love1 />}
              {openBox === 2 && <Love2 />}
              {openBox === 3 && <Love3 />}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#ffd6e7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h2>🔒 Área Secreta</h2>
      <p>Selecciona la fecha correcta</p>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: "10px", marginTop: "10px" }}
      />

      <br />

      <button
        onClick={checkPassword}
        style={{
          marginTop: "15px",
          backgroundColor: "#c084fc",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Entrar
      </button>
    </div>
  );
}