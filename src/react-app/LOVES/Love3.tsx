export default function TeAmo() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to top, #ff9a9e, #fad0c4)",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2rem, 8vw, 5rem)",
          color: "white",
          fontFamily: "'Brush Script MT', cursive",
          textShadow: "0 0 10px #ff4d6d, 0 0 20px #ff4d6d",
          animation: "latido 1s infinite",
        }}
      >
        💖 Te amo 💖
      </h1>

      <style>
        {`
          @keyframes latido {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
