// __tests__/moves.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { getAllMoves, createMove } = require('../../controllers/moveController');

const app = express();
app.use(bodyParser.json());
app.get('/api/match/:id/moves', getAllMoves);
app.post('/api/match/:id/moves', createMove);

describe('GET /api/match/:id/moves', () => {
  it('debería devolver todos los movimientos en notación de ajedrez', async () => {
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

  it('debería devolver 404 si no se encuentran movimientos', async () => {
    const gameId = 999;
    const response = await request(app)
      .get(`/api/match/${gameId}/moves`)
      .expect(404);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No se encontraron movimientos para este juego');
  });

  it('debería devolver 500 si hay un error en el servidor', async () => {
    const gameId = 'invalid'; // Un gameId inválido

    const response = await request(app)
      .get(`/api/match/${gameId}/moves`)
      .expect(500);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error interno del servidor');
  });
});

describe('POST /api/match/:id/moves', () => {
  it('debería crear un nuevo movimiento y devolver un mensaje de éxito', async () => {
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

  it('debería devolver 400 si los datos del movimiento están incompletos', async () => {
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

  it('debería devolver 400 si el movimiento es inválido', async () => {
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

  it('debería devolver 500 si hay un error en el servidor', async () => {
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
