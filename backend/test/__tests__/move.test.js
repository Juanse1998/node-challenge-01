// __tests__/moves.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { getAllMoves, createMove } = require('../../controllers/moveController.js'); // Ajusta la ruta del controlador

const app = express();
app.use(bodyParser.json());
app.get('/api/match/:id/moves', getAllMoves);
app.post('/api/match/:id/moves', createMove);

describe('GET /api/match/:id/moves', () => {
  it('should return all moves in chess notation', async () => {
    const gameId = 1;

    const response = await request(app)
      .get(`/api/match/${gameId}/moves`)
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.body.moves).toEqual([
      'a8 -> c7',
      'd2 -> d4'
    ]);
  });

  it('should return 404 if no moves are found', async () => {
    const gameId = 999; // Un gameId que no existe

    const response = await request(app)
      .get(`/api/match/${gameId}/moves`)
      .expect(404);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No se encontraron movimientos para este juego');
  });

  it('should return 500 if there is a server error', async () => {
    const gameId = 'invalid'; // Un gameId inválido

    const response = await request(app)
      .get(`/api/match/${gameId}/moves`)
      .expect(500);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error al obtener los movimientos');
  });
});

describe('POST /api/match/:id/moves', () => {
  it('should create a new move and return success message', async () => {
    const gameId = 1;
    const moveData = {
      piece: { name: 'Knight' }, // Define el nombre de la pieza
      from: { x: 1, y: 0 }, // Coordenadas de la pieza
      to: { x: 2, y: 2 }, // Coordenadas de destino
      gameId: gameId
    };

    const response = await request(app)
      .post(`/api/match/${gameId}/moves`)
      .send(moveData)
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Movimiento realizado con éxito');
    expect(response.body.move).toEqual({
      from: { x: 1, y: 0 },
      to: { x: 2, y: 2 },
      piece: { name: 'Knight' }
    });
  });

  it('should return 400 if move data is incomplete', async () => {
    const gameId = 1;
    const moveData = {
      piece: { name: 'Knight' }, // Datos incompletos (falta `to` y `from`)
      gameId: gameId
    };

    const response = await request(app)
      .post(`/api/match/${gameId}/moves`)
      .send(moveData)
      .expect(400);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Datos incompletos');
  });

  it('should return 400 if the move is invalid', async () => {
    const gameId = 1;
    const moveData = {
      piece: { name: 'Knight' },
      from: { x: 0, y: 0 }, // Posición no válida
      to: { x: 0, y: 2 },
      gameId: gameId
    };

    const response = await request(app)
      .post(`/api/match/${gameId}/moves`)
      .send(moveData)
      .expect(400);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Movimiento inválido');
  });

  it('should return 500 if there is a server error', async () => {
    const gameId = 'invalid'; // Un gameId inválido
    const moveData = {
      piece: { name: 'Knight' },
      from: { x: 1, y: 0 },
      to: { x: 2, y: 2 },
      gameId: gameId
    };

    const response = await request(app)
      .post(`/api/match/${gameId}/moves`)
      .send(moveData)
      .expect(500);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error al realizar el movimiento');
  });
});
