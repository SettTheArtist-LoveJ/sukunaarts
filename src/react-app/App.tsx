export default function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>SukunaArts</h1>
      <p style={styles.subtitle}>Portal de juegos en línea</p>

      <div style={styles.card}>
        <h2>Juegos disponibles</h2>
        <p>Próximamente juegos interactivos aquí.</p>
      </div>

      <div style={styles.card}>
        <h2>Destacado</h2>
        <p>Juego en desarrollo...</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center" as const,
    marginTop: "40px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#666",
    marginBottom: "20px",
  },
  card: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    margin: "10px auto",
    width: "80%",
    maxWidth: "400px",
  },
};
