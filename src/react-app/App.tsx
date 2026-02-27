import { useState, useEffect } from "react";

interface Game {
  id: string;
  name: string;
  icon: string;
  category: string;
  tag: string;
  players: string;
  desc: string;
}

export default function App() {
  const [games] = useState<Game[]>([
    { id: 'snake', name: 'Snake', icon: '🐍', category: 'arcade', tag: 'Arcade', players: '12K', desc: 'Guia la serpiente y recoge la comida.' },
    { id: 'memory', name: 'Memoria', icon: '🧠', category: 'puzzle', tag: 'Puzzle', players: '8K', desc: 'Encuentra las parejas de cartas iguales.' },
    { id: 'tictactoe', name: 'Tres en Raya', icon: '❌', category: 'estrategia', tag: 'Estrategia', players: '15K', desc: 'Clásico tres en raya contra la máquina.' },
    { id: 'breakout', name: 'Breakout', icon: '🎯', category: 'arcade', tag: 'Arcade', players: '9K', desc: 'Destruye los bloques con la pelota.' },
    { id: 'flappy', name: 'Flappy Bird', icon: '🐦', category: 'arcade', tag: 'Arcade', players: '20K', desc: 'Evita los tubos y sobrevive.' },
    { id: 'sudoku', name: 'Sudoku', icon: '🔢', category: 'puzzle', tag: 'Puzzle', players: '11K', desc: 'Completa la cuadrícula sin repetir números.' },
    { id: 'chess', name: 'Ajedrez', icon: '♟️', category: 'estrategia', tag: 'Estrategia', players: '18K', desc: 'Derrota a tu oponente con estrategia.' },
  ]);

  const [category, setCategory] = useState("todos");
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  const filteredGames = category === "todos" ? games : games.filter(g => g.category === category);

  // Simular partículas (opcional, simple)
  useEffect(() => {
    const container = document.getElementById("particles");
    if (container) {
      container.innerHTML = "";
      for (let i = 0; i < 40; i++) {
        const span = document.createElement("span");
        span.style.left = Math.random() * 100 + "%";
        span.style.width = span.style.height = 2 + Math.random() * 3 + "px";
        container.appendChild(span);
      }
    }
  }, []);

  return (
    <div style={styles.body}>
      <div id="particles" style={styles.bgParticles}></div>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo}>SUKUNA<span style={{ color: "#f72585" }}>ARTS</span></div>
        <ul style={styles.navLinks}>
          {["Inicio", "Juegos", "Destacado", "Comunidad"].map((item) => (
            <li key={item}><a href={`#${item.toLowerCase()}`} style={styles.navLink}>{item}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section style={styles.hero} id="inicio">
        <div style={styles.heroBadge}>Portal de Juegos Online</div>
        <h1 style={styles.heroTitle}>SUKUNA<span style={styles.highlight}>ARTS</span></h1>
        <p style={styles.heroDesc}>Descubre una colección de juegos clásicos y desafiantes. Juega directamente en tu navegador, sin descargas.</p>
        <div style={styles.heroButtons}>
          <button style={styles.btnPrimary} onClick={() => document.getElementById("juegos")?.scrollIntoView({ behavior: "smooth" })}>Jugar Ahora</button>
        </div>
      </section>

      {/* JUEGOS */}
      <section id="juegos" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2>Nuestros Juegos</h2>
          <p>Elige tu favorito y empieza a jugar al instante</p>
          <span style={styles.line}></span>
        </div>
        <div style={styles.categories}>
          {["todos", "arcade", "puzzle", "estrategia"].map(cat => (
            <button
              key={cat}
              style={category === cat ? styles.catBtnActive : styles.catBtn}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div style={styles.gamesGrid}>
          {filteredGames.map(game => (
            <div key={game.id} style={styles.gameCard} onClick={() => setCurrentGame(game)}>
              <div style={styles.gameThumb}>{game.icon}</div>
              <div style={styles.gameInfo}>
                <h3>{game.name}</h3>
                <div style={styles.gameMeta}>
                  <span style={styles.gameTag}>{game.tag}</span>
                  <span>{game.players} jugadores</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {currentGame && (
        <div style={styles.modalOverlay} onClick={() => setCurrentGame(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setCurrentGame(null)}>&times;</button>
            <div style={styles.modalIcon}>{currentGame.icon}</div>
            <h3>{currentGame.name}</h3>
            <p>{currentGame.desc}</p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>SUKUNAARTS</div>
        <p style={styles.footerCopy}>&copy; 2026 SukunaArts. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

// ===== STYLES =====
const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: "'Rajdhani', sans-serif",
    background: "#0b0b0f",
    color: "#edf2f4",
    minHeight: "100vh",
    margin: 0,          // ✅ reset margen
    padding: 0,         // ✅ reset padding
    width: "100%",      // ✅ asegurar ancho completo
    overflowX: "hidden" // ✅ eliminar scroll lateral
  },
  bgParticles: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "hidden" },
  nav: { position: "fixed", top: 0, left: 0, right: 0, height: "70px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 2rem", background: "rgba(11,11,15,0.85)", backdropFilter: "blur(12px)", zIndex: 100 },
  logo: { fontFamily: "'Orbitron', sans-serif", fontSize: "1.6rem", fontWeight: 900, background: "linear-gradient(135deg, #e63946, #f72585)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  navLinks: { display: "flex", listStyle: "none", gap: "2rem" },
  navLink: { color: "#8d99ae", textDecoration: "none" },
  hero: { minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "6rem 2rem 4rem", zIndex: 1 },
  heroBadge: { padding: "0.4rem 1.2rem", border: "1px solid #e63946", borderRadius: "50px", color: "#e63946", fontSize: "0.85rem", marginBottom: "1.5rem" },
  heroTitle: { fontFamily: "'Orbitron', sans-serif", fontSize: "4rem", fontWeight: 900, marginBottom: "1rem" },
  highlight: { background: "linear-gradient(135deg, #e63946, #f72585)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroDesc: { color: "#8d99ae", fontSize: "1.2rem", maxWidth: "550px", marginBottom: "2.5rem" },
  heroButtons: { display: "flex", gap: "1rem" },
  btnPrimary: { background: "linear-gradient(135deg, #e63946, #f72585)", color: "#fff", border: "none", padding: "0.85rem 2rem", borderRadius: "8px", cursor: "pointer" },
  section: { padding: "5rem 2rem" },
  sectionHeader: { textAlign: "center", marginBottom: "3rem" },
  line: { display: "block", width: "60px", height: "3px", background: "linear-gradient(135deg, #e63946, #f72585)", margin: "1rem auto 0", borderRadius: "2px" },
  categories: { display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2.5rem", flexWrap: "wrap" },
  catBtn: { padding: "0.5rem 1.5rem", borderRadius: "50px", background: "#15151d", border: "1px solid rgba(255,255,255,0.08)", color: "#8d99ae", cursor: "pointer" },
  catBtnActive: { padding: "0.5rem 1.5rem", borderRadius: "50px", background: "linear-gradient(135deg, #e63946, #f72585)", border: "none", color: "#fff", cursor: "pointer" },
  gamesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "1200px", margin: "0 auto" },
  gameCard: { background: "#15151d", borderRadius: "16px", cursor: "pointer", overflow: "hidden", padding: "1rem" },
  gameThumb: { fontSize: "3.5rem", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" },
  gameInfo: {},
  gameMeta: { display: "flex", justifyContent: "space-between", color: "#8d99ae" },
  gameTag: { background: "rgba(230,57,70,0.15)", padding: "0.2rem 0.6rem", borderRadius: "4px", color: "#e63946", fontWeight: 700, fontSize: "0.75rem" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { background: "#15151d", borderRadius: "20px", padding: "2.5rem", maxWidth: "500px", position: "relative", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" },
  modalClose: { position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#8d99ae", fontSize: "1.5rem", cursor: "pointer" },
  modalIcon: { fontSize: "4rem", marginBottom: "1rem" },
  footer: { textAlign: "center", padding: "3rem 2rem", borderTop: "1px solid rgba(255,255,255,0.05)" },
  footerLogo: { fontFamily: "'Orbitron', sans-serif", fontSize: "1.3rem", fontWeight: 900, background: "linear-gradient(135deg, #e63946, #f72585)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" },
  footerCopy: { color: "#8d99ae" },
};
