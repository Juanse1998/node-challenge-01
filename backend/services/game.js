const {updateBoard} = require('./board.js');

// Simulación de una partida completa de ajedrez
// const completedGameMoves = [
//   { from: { x: 6, y: 4 }, to: { x: 4, y: 4 }, piece: 'p' }, // Peón blanco mueve de e2 a e4
//   { from: { x: 1, y: 4 }, to: { x: 3, y: 4 }, piece: 'P' }, // Peón negro mueve de e7 a e5
//   { from: { x: 7, y: 6 }, to: { x: 5, y: 5 }, piece: 'n' }, // Caballo blanco mueve de g1 a f3
//   { from: { x: 0, y: 1 }, to: { x: 2, y: 2 }, piece: 'N' }, // Caballo negro mueve de b8 a c6
//   { from: { x: 7, y: 3 }, to: { x: 3, y: 7 }, piece: 'q' }, // Dama blanca mueve de d1 a h5
//   { from: { x: 0, y: 6 }, to: { x: 2, y: 5 }, piece: 'n' }, // Caballo negro mueve de g8 a f6
//   { from: { x: 7, y: 5 }, to: { x: 4, y: 2 }, piece: 'b' }, // Alfil blanco mueve de f1 a c4
//   { from: { x: 1, y: 3 }, to: { x: 2, y: 3 }, piece: 'p' }, // Peón negro mueve de d7 a d6
//   { from: { x: 3, y: 7 }, to: { x: 1, y: 5 }, piece: 'q' }  // Dama blanca jaque mate en f7
// ];

// const completedGameMoves1 = [
//   { from: { x: 6, y: 4 }, to: { x: 4, y: 4 }, piece: 'p' }, // Peón blanco mueve de e2 a e4
//   { from: { x: 1, y: 4 }, to: { x: 3, y: 4 }, piece: 'P' }, // Peón negro mueve de e7 a e5
//   { from: { x: 7, y: 6 }, to: { x: 5, y: 5 }, piece: 'n' }, // Caballo blanco mueve de g1 a f3
//   { from: { x: 0, y: 6 }, to: { x: 2, y: 5 }, piece: 'n' }, // Caballo negro mueve de g8 a f6
//   { from: { x: 7, y: 5 }, to: { x: 3, y: 1 }, piece: 'b' }, // Alfil blanco mueve de f1 a b5
//   { from: { x: 0, y: 1 }, to: { x: 2, y: 2 }, piece: 'N' }, // Caballo negro mueve de b8 a c6
//   { from: { x: 3, y: 1 }, to: { x: 1, y: 3 }, piece: 'b' }, // Alfil blanco jaque mate en c3
// ];

// const completedGameMoves2 = [
//   { from: { x: 6, y: 3 }, to: { x: 4, y: 3 }, piece: 'p' }, // Peón blanco mueve de d2 a d4
//   { from: { x: 1, y: 3 }, to: { x: 3, y: 3 }, piece: 'P' }, // Peón negro mueve de d7 a d5
//   { from: { x: 7, y: 5 }, to: { x: 4, y: 2 }, piece: 'b' }, // Alfil blanco mueve de f1 a c4
//   { from: { x: 0, y: 1 }, to: { x: 2, y: 2 }, piece: 'N' }, // Caballo negro mueve de b8 a c6
//   { from: { x: 4, y: 2 }, to: { x: 1, y: 5 }, piece: 'b' }, // Alfil blanco jaque mate en f7
// ];

// const completedGameMoves3 = [
//   { from: { x: 6, y: 3 }, to: { x: 4, y: 3 }, piece: 'p' }, // Peón blanco mueve de d2 a d4
//   { from: { x: 1, y: 2 }, to: { x: 3, y: 2 }, piece: 'P' }, // Peón negro mueve de c7 a c5
//   { from: { x: 7, y: 1 }, to: { x: 5, y: 2 }, piece: 'n' }, // Caballo blanco mueve de b1 a c3
//   { from: { x: 0, y: 6 }, to: { x: 2, y: 5 }, piece: 'n' }, // Caballo negro mueve de g8 a f6
//   { from: { x: 5, y: 2 }, to: { x: 2, y: 4 }, piece: 'n' }, // Caballo blanco mueve de c3 a e4
//   { from: { x: 1, y: 4 }, to: { x: 2, y: 4 }, piece: 'p' }, // Peón negro captura en e4
//   { from: { x: 7, y: 3 }, to: { x: 3, y: 7 }, piece: 'q' }, // Dama blanca mueve de d1 a h5
//   { from: { x: 0, y: 5 }, to: { x: 1, y: 4 }, piece: 'B' }, // Alfil negro mueve de f8 a e7
//   { from: { x: 3, y: 7 }, to: { x: 1, y: 5 }, piece: 'q' }, // Dama blanca jaque mate en f7
// ];


// Función para crear el tablero inicial
const createInitialBoard = () => [
  ["T", "C", "A", "D", "R", "A", "C", "T"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["t", "c", "a", "d", "r", "a", "c", "t"]
];

// Función para simular todos los movimientos y devolver el tablero final
// const simulateGame = (moves) => {
//   let board = createInitialBoard();
//   moves.forEach(move => {
//     board = updateBoard(board, move.from, move.to, move.piece);
//   });
//   return board;
// };


module.exports = {
  simulateGame
}