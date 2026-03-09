import { useRef, useState, useEffect } from "react";

export default function Love1() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const heartRef = useRef<HTMLButtonElement>(null);

  const [firstClick, setFirstClick] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const PHRASES = [
    "Eres mi mejor aventura ✨ 💖",
    "Contigo todo es magia 🌙 💖",
    "Quiero pasar toda mi vida contigo 🥺 💖",
    "Tu sonrisa ilumina mi vida 🌟 💖",
    "Eres mi canción favorita 🎶 💖",
    "Mi destino eres tú 💫 💖",
    "Nuestro amor será eterno 🔥 💖",
    "A tu lado soy feliz 💖",
    "Te amo cada día más 🥺",
    "Tu amor es mi inspiración 🎨 💖",
    "Eres mi hogar y mi aventura 🗺️ 💖",
    "Contigo el tiempo se detiene ⏰ 💖",
    "Te Amo 🥺💖",
  ];

  function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div");
      star.className = "star";

      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";

      star.style.animationDuration = rand(2, 6) + "s";
      star.style.animationDelay = rand(0, 5) + "s";

      scene.appendChild(star);
    }
  }, []);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function releasePhrase() {
    const scene = sceneRef.current;
    const audio = audioRef.current;
    const heart = heartRef.current;

    if (!scene || !heart) return;

    if (firstClick && audio) {
      audio.play();
      setShowPlayer(true);
      setIsPlaying(true);
      setFirstClick(false);

      audio.ontimeupdate = () => {
        setTime(audio.currentTime);
      };

      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };
    }

    heart.classList.remove("beat-once");
    void heart.offsetWidth;
    heart.classList.add("beat-once");

    const amount = rand(2, 3);

    for (let i = 0; i < amount; i++) {
      createPhrase(scene, heart);
    }
  }

  function createPhrase(scene: HTMLDivElement, heart: HTMLButtonElement) {
    const phrase = document.createElement("div");
    phrase.className = "phrase shooting";

    phrase.textContent =
      PHRASES[Math.floor(Math.random() * PHRASES.length)];

    const heartRect = heart.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();

    const startX =
      heartRect.left +
      rand(0, heartRect.width) -
      sceneRect.left;

    const startY =
      heartRect.top +
      rand(0, heartRect.height) -
      sceneRect.top;

    phrase.style.left = startX + "px";
    phrase.style.top = startY + "px";

    const shootX = rand(-150, 150);
    const shootY = rand(-350, -200);

    const finalX = shootX + rand(-120, 120);
    const finalY = shootY + rand(350, 550);

    phrase.style.setProperty("--shoot-x", shootX + "px");
    phrase.style.setProperty("--shoot-y", shootY + "px");
    phrase.style.setProperty("--final-x", finalX + "px");
    phrase.style.setProperty("--final-y", finalY + "px");
    phrase.style.setProperty("--duration", rand(4, 6) + "s");

    scene.appendChild(phrase);

    phrase.addEventListener("animationend", () => phrase.remove(), {
      once: true,
    });
  }

  function formatTime(t:number){
    const m=Math.floor(t/60);
    const s=Math.floor(t%60).toString().padStart(2,"0");
    return `${m}:${s}`;
  }

  return (
    <>
      <style>{`

.scene{
  width:100%;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  background:linear-gradient(to bottom,#000,#2a3a6b);
  overflow:hidden;
  position:relative;
  border-radius:20px;
}

.music-player{
position:absolute;
top:20px;
left:50%;
transform:translateX(-50%);
display:flex;
align-items:center;
gap:15px;

padding:clamp(10px,2vw,16px) clamp(14px,3vw,22px);
border-radius:25px;

background:rgba(120,40,80,.85);
backdrop-filter:blur(8px);

color:white;
width:90%;
max-width:420px;
box-shadow:0 0 25px rgba(255,0,120,.6);
}

.music-btn{
width:clamp(35px,6vw,50px);
height:clamp(35px,6vw,50px);
border-radius:50%;
border:none;
background:#ff3b6b;
color:white;
font-size:clamp(14px,3vw,20px);
cursor:pointer;

display:flex;
align-items:center;
justify-content:center;
}

.music-info{flex:1;}

.music-title{
font-weight:bold;
margin-bottom:6px;
}

.music-bar{
height:6px;
background:rgba(255,255,255,.3);
border-radius:10px;
overflow:hidden;
}

.music-progress{
height:100%;
background:#ff6aa8;
width:0%;
transition:width .2s;
}

.music-time{
font-size:12px;
opacity:.8;
display:flex;
justify-content:space-between;
margin-top:4px;
}

.heart-btn{
  font-size:clamp(50px, 10vw, 120px);
  background:none;
  border:none;
  cursor:pointer;
  outline:none;
  box-shadow:none;

  color:#ff4da6;

  text-shadow:
  0 0 5px #ff4da6,
  0 0 10px #ff4da6,
  0 0 20px #ff4da6,
  0 0 40px #ff1a8c,
  0 0 80px #ff1a8c;
}
  .heart-btn:focus{
  outline:none;
  box-shadow:none;
}

.heart-btn:focus-visible{
  outline:none;
  box-shadow:none;
}

.heart-btn.beat-once{
animation:beat .6s ease;
}

@keyframes beat{
0%{transform:scale(1)}
25%{transform:scale(1.4)}
50%{transform:scale(.9)}
75%{transform:scale(1.2)}
100%{transform:scale(1)}
}

.star{
position:absolute;
width:2px;
height:2px;
background:white;
border-radius:50%;
opacity:0;
animation:twinkle infinite ease-in-out;
}

@keyframes twinkle{
0%{opacity:0}
50%{opacity:1}
100%{opacity:0}
}

.phrase{
position:absolute;
padding:clamp(6px,1.5vw,10px) clamp(10px,2vw,18px);
background:rgba(139,69,119,.6);
border-radius:20px;
color:#ffd6e7;
font-weight:bold;
font-size:clamp(12px,2vw,16px);
max-width:80%;
text-align:center;
transform:translate(-50%,-50%);
opacity:0;

}

.phrase.shooting{
animation:shoot var(--duration) cubic-bezier(.25,.46,.45,.94) forwards;
}

@keyframes shoot{
0%{opacity:0;transform:translate(-50%,-50%) scale(.5);}
10%{opacity:1;transform:translate(calc(-50% + var(--shoot-x)),calc(-50% + var(--shoot-y)));}
80%{opacity:1;transform:translate(calc(-50% + var(--final-x)),calc(-50% + var(--final-y)));}
100%{opacity:0;transform:translate(calc(-50% + var(--final-x)),calc(-50% + var(--final-y))) scale(.7);}
}

`}</style>

      <div className="scene" ref={sceneRef}>

        {showPlayer && (
          <div className="music-player">
            <button className="music-btn" onClick={toggleMusic}>
              {isPlaying ? "⏸" : "▶"}
            </button>

            <div className="music-info">
              <div className="music-title">
                Te dedico esta canción ❤️
              </div>

              <div className="music-bar">
                <div
                  className="music-progress"
                  style={{width:`${(time/duration)*100}%`}}
                />
              </div>

              <div className="music-time">
                <span>{formatTime(time)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        )}

        <button className="heart-btn" ref={heartRef} onClick={releasePhrase}>
          ❤️
        </button>

        <audio ref={audioRef} loop>
          <source src="https://www.dropbox.com/scl/fi/tgubkawy1tk1yp5kwvpn9/Estoycontento.mp3?rlkey=ki09zcsro7de5hrs7k9yx5kwj&st=d937kn38&dl=1" />
        </audio>
      </div>
    </>
  );
}