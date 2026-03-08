import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ChessGame from "./ChessGame";
import TicTacToe from "./TicTacToe";
import Secret from "./Secret";

interface Game {
  id: string;
  name: string;
  icon: string;
  category: string;
  tag: string;
  players: string;
  desc: string;
}

function Home() {
  const navigate = useNavigate();

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

      <nav style={styles.nav}>
        <div style={styles.logo}>SUKUNA<span style={{ color: "#f72585" }}>ARTS</span></div>
        <ul style={styles.navLinks}>
         {["Inicio","Juegos"].map((item) => (
  <li key={item}>
    <a
      href={`#${item.toLowerCase()}`}
      style={styles.navLink}
      onClick={(e) => {
        e.preventDefault();
        document
          .getElementById(item.toLowerCase())
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {item}
    </a>
  </li>
))}
        </ul>
      </nav>

      <section style={styles.hero} id="inicio">
        <div style={styles.heroBadge}>Portal de Juegos Online</div>
        <h1 style={styles.heroTitle}>SUKUNA<span style={styles.highlight}>ARTS</span></h1>
        <p style={styles.heroDesc}>Descubre una colección de juegos clásicos y desafiantes.</p>

        <div style={styles.heroButtons}>
          <button
            style={styles.btnPrimary}
            onClick={() => document.getElementById("juegos")?.scrollIntoView({ behavior: "smooth" })}
          >
            Jugar Ahora
          </button>

          <button
            style={styles.btnPrimary}
            onClick={() => navigate("/secret")}
          >
            Secret
          </button>
        </div>
      </section>

      <section id="juegos" style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2>Nuestros Juegos</h2>
          <span style={styles.line}></span>
        </div>

        <div style={styles.categories}>
          {["todos","arcade","puzzle","estrategia"].map(cat => (
            <button
              key={cat}
              style={category === cat ? styles.catBtnActive : styles.catBtn}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.gamesGrid}>
          {filteredGames.map(game => (
            <div key={game.id} style={styles.gameCard} onClick={() => setCurrentGame(game)}>
              <div style={styles.gameThumb}>{game.icon}</div>
              <h3>{game.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {currentGame && (
        <div style={styles.modalOverlay} onClick={() => setCurrentGame(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setCurrentGame(null)}>&times;</button>

            {currentGame.id === "tictactoe" && <TicTacToe />}
            {currentGame.id === "chess" && <ChessGame />}
          </div>
        </div>
      )}

      <footer style={styles.footer}>
        <div style={styles.footerLogo}>SUKUNAARTS</div>
        <p style={styles.footerCopy}>© 2026 SukunaArts</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/secret" element={<Secret />} />
    </Routes>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body:{fontFamily:"sans-serif",background:"#0b0b0f",color:"#fff",minHeight:"100vh"},
  nav:{display:"flex",justifyContent:"space-between",padding:"20px"},
  logo:{fontWeight:900,fontSize:"20px"},
  navLinks:{display:"flex",gap:"20px",listStyle:"none"},
  navLink:{color:"#aaa",textDecoration:"none"},
  hero:{textAlign:"center",padding:"120px 20px"},
  heroBadge:{color:"#e63946"},
  heroTitle:{fontSize:"48px"},
  highlight:{color:"#f72585"},
  heroDesc:{color:"#aaa"},
  heroButtons:{display:"flex",gap:"10px",justifyContent:"center"},
  btnPrimary:{background:"#e63946",border:"none",padding:"10px 20px",cursor:"pointer",color:"#fff"},
  section:{padding:"60px 20px"},
  sectionHeader:{textAlign:"center"},
  line:{display:"block",width:"60px",height:"3px",background:"#e63946",margin:"10px auto"},
  categories:{display:"flex",gap:"10px",justifyContent:"center"},
  catBtn:{padding:"8px 15px",cursor:"pointer"},
  catBtnActive:{padding:"8px 15px",background:"#e63946",cursor:"pointer"},
  gamesGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"20px"},
  gameCard:{background:"#15151d",padding:"20px",cursor:"pointer"},
  gameThumb:{fontSize:"40px"},
  modalOverlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center"},
  modal:{background:"#15151d",padding:"30px"},
  modalClose:{position:"absolute"},
  footer:{textAlign:"center",padding:"40px"},
  footerLogo:{fontWeight:900},
  footerCopy:{color:"#aaa"},
  bgParticles:{position:"fixed",inset:0}
};
