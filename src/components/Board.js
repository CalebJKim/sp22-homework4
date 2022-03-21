import React, { useState } from "react";
import './styles/Board.css';
import Square from "./Square";

function Board() {
  const [ whoseTurn, changeTurn ] = useState(true);
  const toPlace = whoseTurn ? "X" : "O";
  const [ box, fillBox ] = useState(Array(9).fill(null));
  const winner = getWinner(box);
    function renderSquare(i) {
        return <Square 
        value={box[i]}
        onClick={() => {
          if (box[i] != null || winner != null) {
            return;
          }
          const nextSquares = box.slice();
          nextSquares[i] = toPlace;
          fillBox(nextSquares);

          changeTurn(!whoseTurn);
        }}
        />;
    }

    function placeable(box) {
      var filled = 0;
      for (let i = 0; i < box.length; i++) {
        if (box[i] == null) {
          filled++;
        }
      }
      if (filled == box.length) {
        return false;
      } else {
        return true;
      }
    }

    function getWinner(box) {
      const threeRow = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
      ];
      for (let i = 0; i < threeRow.length; i++) {
        const [a, b, c] = threeRow[i];
        if ((box[a] != null) && (box[a] === box[b]) && (box[a] === box[c])) {
          return box[a];
        }
      }
      return null;
    }

    function gameState() {
      if (winner) {
        return winner + " wins! Refresh this window to play again!"
      } else if (placeable(box)) {
        return toPlace;
      } else {
        return "Start clicking boxes to place on your turn, and get three in a row to win!";
      }
    }

    return (  
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="gameState">{gameState()}</div>
        </div>
    )
}

export default Board;