// __tests__/move.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { createMove } = require('../../controllers/moveController.js');

const app = express();
app.use(bodyParser.json());
app.post('/games/:gameId/moves', createMove);

describe('POST /games/gameId/moves - Valid knight move', () => {
  it('should successfully move the knight to a valid position', async () => {
    const response = await request(app)
      .post('/games/1/moves')
      .send({
        piece: { name: 'knight' },
        from: { x: 1, y: 0 },
        to: { x: 2, y: 2 }, 
        board: [
          [null, { name: 'knight' }, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null]
        ]
      });
      
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Movimiento realizado con éxito');
    
    // Valido que el tablero este actualizado
    expect(response.body.board[2][2].name).toBe('knight');
    expect(response.body.board[1][0]).toBe(null);
  });

  it('should successfully move the knight to a valid position', async () => {
    const response = await request(app)
      .post('/games/1/moves')
      .send({
        piece: { name: 'knight' },
        from: { x: 1, y: 0 },
        to: { x: 3, y: 1 },
        board: [
          [null, { name: 'knight' }, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null]
        ]
      });
      
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Movimiento realizado con éxito');
    expect(response.body.board[3][1].name).toBe('knight');
    expect(response.body.board[1][0]).toBe(null);
  });

  it('should return an error for an invalid knight move', async () => {
    const response = await request(app)
      .post('/games/1/moves')
      .send({
        piece: { name: 'knight' },
        from: { x: 1, y: 0 },
        to: { x: 3, y: 3 },
        board: [
          [null, { name: 'knight' }, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null],
          [null, null, null, null, null, null, null, null]
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Movimiento invalido para el caballo');
  });
});
