import { useState } from "react";

export default function TicTacToe() {

  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);

  const player = "X";
  const bot = "O";

  function handleClick(index: number) {
    if (board[index] || winner || !difficulty) return;

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      return;
    }

    setTimeout(() => botMove(newBoard), 500);
  }

  function botMove(currentBoard: (string | null)[]) {
    if (!difficulty) return;

    if (difficulty === "easy") {
      randomMove(currentBoard);
    } 
    else if (difficulty === "medium") {
      smartMove(currentBoard);
    } 
    else {
      bestMove(currentBoard);
    }
  }

  function randomMove(currentBoard: (string | null)[]) {
    const empty = getEmpty(currentBoard);
    const randomIndex = empty[Math.floor(Math.random() * empty.length)];
    placeBot(currentBoard, randomIndex);
  }

  function smartMove(currentBoard: (string | null)[]) {
    const empty = getEmpty(currentBoard);

    for (let i of empty) {
      const test = [...currentBoard];
      test[i] = bot;
      if (calculateWinner(test) === bot) {
        placeBot(currentBoard, i);
        return;
      }
    }

    for (let i of empty) {
      const test = [...currentBoard];
      test[i] = player;
      if (calculateWinner(test) === player) {
        placeBot(currentBoard, i);
        return;
      }
    }

    randomMove(currentBoard);
  }

  function bestMove(currentBoard: (string | null)[]) {
    let bestScore = -Infinity;
    let move = -1;

    for (let i of getEmpty(currentBoard)) {
      const test = [...currentBoard];
      test[i] = bot;
      const score = minimax(test, 0, false);
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }

    placeBot(currentBoard, move);
  }

  function minimax(board: (string | null)[], depth: number, isMaximizing: boolean): number {
    const result = calculateWinner(board);
    if (result === bot) return 10 - depth;
    if (result === player) return depth - 10;
    if (getEmpty(board).length === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i of getEmpty(board)) {
        const test = [...board];
        test[i] = bot;
        bestScore = Math.max(bestScore, minimax(test, depth + 1, false));
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i of getEmpty(board)) {
        const test = [...board];
        test[i] = player;
        bestScore = Math.min(bestScore, minimax(test, depth + 1, true));
      }
      return bestScore;
    }
  }

  function placeBot(currentBoard: (string | null)[], index: number) {
    const newBoard = [...currentBoard];
    newBoard[index] = bot;
    setBoard(newBoard);

    const win = calculateWinner(newBoard);
    if (win) setWinner(win);
  }

  function getEmpty(board: (string | null)[]) {
    return board
      .map((v, i) => (v === null ? i : null))
      .filter(v => v !== null) as number[];
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setDifficulty(null);
  }

  if (!difficulty) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Elige dificultad</h3>
        <button onClick={() => setDifficulty("easy")}>🟢 Fácil</button>
        <button onClick={() => setDifficulty("medium")} style={{ margin: "0 10px" }}>🟡 Medio</button>
        <button onClick={() => setDifficulty("hard")}>🔴 Imposible</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h3>
        {winner
          ? winner === player
            ? "🎉 Ganaste!"
            : "🤖 El Bot ganó!"
          : "Tu turno (X)"}
      </h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 100px)",
        gap: "12px",
        justifyContent: "center",
        margin: "20px 0"
      }}>
        {board.map((cell, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3rem",
              fontWeight: "bold",
              background: "#1c1c25",
              borderRadius: "12px",
              cursor: "pointer"
            }}
          >
            {cell === "X" && <span style={{ color: "#f72585" }}>X</span>}
            {cell === "O" && <span style={{ color: "#4cc9f0" }}>O</span>}
          </div>
        ))}
      </div>

      <button onClick={resetGame}>Cambiar dificultad</button>
    </div>
  );
}

function calculateWinner(board: (string | null)[]) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
