import { useState } from "react";
import { Chess } from "chess.js";

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const board = game.board(); // tablero actual

  function handleClick(row: number, col: number) {
    const piece = board[row][col];
    const square = String.fromCharCode(97 + col) + (8 - row);

    // Si no hay pieza seleccionada
    if (!selected) {
      if (piece && piece.color === game.turn()) {
        setSelected([row, col]);
      }
      return;
    }

    const [sr, sc] = selected;
    const from = String.fromCharCode(97 + sc) + (8 - sr);
    const to = square;

    // Si selecciona otra pieza de su color, cambiar selección
    if (piece && piece.color === game.turn()) {
      setSelected([row, col]);
      return;
    }

    const newGame = new Chess(game.fen());

    const move = newGame.move({
      from,
      to,
      promotion: "q"
    });

    if (move) {
      // ✅ Después de mover, actualizamos el juego
      setGame(newGame);
      setSelected(null); // limpiar selección
      // ✅ Aquí automáticamente cambia el turno según el motor de chess.js
    } else {
      // movimiento inválido, solo limpiar selección
      setSelected(null);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        {game.turn() === "w" ? "⚪ Blancas deben mover " : "⚫ Negras deben mover"}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 60px)",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isSelected =
              selected?.[0] === r && selected?.[1] === c;

            return (
              <div
                key={`${r}-${c}`}
                onClick={() => handleClick(r, c)}
                style={{
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: (r + c) % 2 === 0 ? "#f0d9b5" : "#b58863",
                  fontSize: "30px",
                  cursor: "pointer",
                  border: isSelected ? "3px solid red" : "1px solid black",
                }}
              >
                {cell ? pieceIcon(cell.type, cell.color) : ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function pieceIcon(type: string, color: string): string {
  const icons: any = {
    // colores invertidos
    p: { w: "♟", b: "♙" },
    r: { w: "♜", b: "♖" },
    n: { w: "♞", b: "♘" },
    b: { w: "♝", b: "♗" },
    q: { w: "♛", b: "♕" },
    k: { w: "♚", b: "♔" },
  };
  return icons[type][color];
}