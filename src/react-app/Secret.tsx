import { useState } from "react";
import Love1 from "./LOVES/Love1";

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

  // 🔓 AREA SECRETA
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
        <h1 style={{ fontSize: "4rem", color: "#ff6fa3", marginBottom: "40px" }}>
          LOVE 💖
        </h1>

        {/* Cuadros */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 150px)",
            gridGap: "20px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              onClick={() => setOpenBox(num)}
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Cuadro {num}
            </div>
          ))}
        </div>

        {/* VENTANA GRANDE */}
        {openBox !== null && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                width: "600px",
                height: "400px",
                borderRadius: "15px",
                padding: "20px",
                position: "relative",
              }}
            >
              {/* BOTON SALIR */}
              <button
                onClick={() => setOpenBox(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#ff6fa3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                Salir
              </button>

              {/* CONTENIDO */}
              {openBox === 1 && <Love1 />}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 🔒 FORMULARIO
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