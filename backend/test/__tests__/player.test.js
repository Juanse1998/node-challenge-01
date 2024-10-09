// __tests__/player.test.js
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { createPlayer } = require('../../controllers/playerController.js');

const app = express();
app.use(bodyParser.json());
app.post('/api/players/create-player', createPlayer);

describe('POST /api/players/create-player', () => {
  it('should successfully create player ', async () => {
    const response = await request(app)
      .post('/api/players/create-player')
      .send({
        name: 'juan',
        last_name: 'sosa',
        username: 'jss1998',
        password: '123456'
      });
      
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Jugador creado con exito');
  });


  it('should return an error for an invalid player name', async () => {
    const response = await request(app)
      .post('/api/players/create-player')
      .send({
        name: 11,
        last_name: 'sosa',
        username: 'jss1998',
        password: '123456'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Los campos name, last_name, username, y password deben ser strings');
  });
});
