// __tests__/moves.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { getAllMoves } = require('../../controllers/moveController.js'); // Ajusta la ruta del controlador

const app = express();
app.use(bodyParser.json());
app.get('/api/match/:id/moves', getAllMoves);

describe('GET /api/match/:id/moves', () => {
  it('should return all moves in chess notation', async () => {
    const gameId = 1;

    // Simulamos que se han realizado algunos movimientos
    const response = await request(app)
      .get(`/api/match/${gameId}/moves`)
      .expect(200);

    expect(response.status).toBe(200);
    expect(response.body.moves).toEqual([
      'a8 -> c7',
      'd2 -> d4'
    ]); // Ajusta esto según los movimientos esperados
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
