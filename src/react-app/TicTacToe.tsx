import { useState } from "react";

export default function TicTacToe() {

  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);

  const player = "X";
  const bot = "O";

  function handleClick(index: number) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = player;

    const result = calculateWinner(newBoard);
    if (result) {
      setBoard(newBoard);
      setWinner(result);
      return;
    }

    setBoard(newBoard);

    setTimeout(() => {
      botMove(newBoard);
    }, 400);
  }

  function botMove(currentBoard: (string | null)[]) {
    let move;

    if (difficulty === "easy") {
      const empty = currentBoard
        .map((v, i) => (v === null ? i : null))
        .filter((v) => v !== null) as number[];

      move = empty[Math.floor(Math.random() * empty.length)];

    } else {
      move = currentBoard.findIndex((v) => v === null);
    }

    if (move === undefined || move === -1) return;

    const newBoard = [...currentBoard];
    newBoard[move] = bot;

    const result = calculateWinner(newBoard);

    setBoard(newBoard);

    if (result) {
      setWinner(result);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setDifficulty(null);
  }

  if (!difficulty) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Selecciona dificultad</h2>

        <button onClick={() => setDifficulty("easy")}>Fácil</button>
        <button onClick={() => setDifficulty("medium")}>Medio</button>
        <button onClick={() => setDifficulty("hard")}>Difícil</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>

      <h2>3 en Raya</h2>

      {winner && <h3>Ganador: {winner}</h3>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,100px)",
          justifyContent: "center",
          gap: "5px",
          marginTop: "20px"
        }}
      >
        {board.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "2rem"
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <button onClick={resetGame} style={{ marginTop: "20px" }}>
        Reiniciar
      </button>

    </div>
  );
}

function calculateWinner(board: (string | null)[]) {

  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
