import { useState } from "react";

type Piece = {
  type: string;
  color: "white" | "black";
};

const initialBoard = (): (Piece | null)[][] => {
  const emptyRow = Array(8).fill(null);

  return [
    [
      { type: "rook", color: "black" },
      { type: "knight", color: "black" },
      { type: "bishop", color: "black" },
      { type: "queen", color: "black" },
      { type: "king", color: "black" },
      { type: "bishop", color: "black" },
      { type: "knight", color: "black" },
      { type: "rook", color: "black" },
    ],
    Array(8).fill({ type: "pawn", color: "black" }),
    [...emptyRow],
    [...emptyRow],
    [...emptyRow],
    [...emptyRow],
    Array(8).fill({ type: "pawn", color: "white" }),
    [
      { type: "rook", color: "white" },
      { type: "knight", color: "white" },
      { type: "bishop", color: "white" },
      { type: "queen", color: "white" },
      { type: "king", color: "white" },
      { type: "bishop", color: "white" },
      { type: "knight", color: "white" },
      { type: "rook", color: "white" },
    ],
  ];
};

export default function ChessGame() {
  const [board, setBoard] = useState(initialBoard());
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [turn, setTurn] = useState<"white" | "black">("white");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);

  function handleClick(row: number, col: number) {
    const piece = board[row][col];

    if (!selected) {
      if (piece && piece.color === turn) {
        setSelected([row, col]);
      }
      return;
    }

    const [sr, sc] = selected;
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = newBoard[sr][sc];
    newBoard[sr][sc] = null;

    setBoard(newBoard);
    setSelected(null);
    setTurn(turn === "white" ? "black" : "white");

    if (difficulty && turn === "white") {
      setTimeout(() => botMove(newBoard), 400);
    }
  }

  function botMove(currentBoard: (Piece | null)[][]) {
    const moves: [number, number, number, number][] = [];

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = currentBoard[r][c];
        if (piece && piece.color === "black") {
          for (let rr = 0; rr < 8; rr++) {
            for (let cc = 0; cc < 8; cc++) {
              if (!currentBoard[rr][cc] || currentBoard[rr][cc]?.color === "white") {
                moves.push([r, c, rr, cc]);
              }
            }
          }
        }
      }
    }

    if (moves.length === 0) return;

    let move;

    if (difficulty === "easy") {
      move = moves[Math.floor(Math.random() * moves.length)];
    } else if (difficulty === "medium") {
      move = moves.find(m => currentBoard[m[2]][m[3]]) || moves[0];
    } else {
      move = moves[moves.length - 1];
    }

    const newBoard = currentBoard.map(r => [...r]);
    newBoard[move[2]][move[3]] = newBoard[move[0]][move[1]];
    newBoard[move[0]][move[1]] = null;

    setBoard(newBoard);
    setTurn("white");
  }

  if (!difficulty) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Elige dificultad</h3>
        <button onClick={() => setDifficulty("easy")}>🟢 Fácil</button>
        <button onClick={() => setDifficulty("medium")} style={{ margin: "0 10px" }}>🟡 Medio</button>
        <button onClick={() => setDifficulty("hard")}>🔴 Difícil</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Turno: {turn}</h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 60px)",
        justifyContent: "center",
        margin: "20px auto"
      }}>
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              style={{
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: (r + c) % 2 === 0 ? "#eee" : "#444",
                color: cell?.color === "white" ? "black" : "white",
                cursor: "pointer",
                fontSize: "1.5rem"
              }}
            >
              {cell ? pieceIcon(cell.type, cell.color) : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function pieceIcon(type: string, color: string) {
  const icons: any = {
    pawn: { white: "♙", black: "♟" },
    rook: { white: "♖", black: "♜" },
    knight: { white: "♘", black: "♞" },
    bishop: { white: "♗", black: "♝" },
    queen: { white: "♕", black: "♛" },
    king: { white: "♔", black: "♚" },
  };

  return icons[type][color];
}
