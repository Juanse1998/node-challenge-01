# Chess Game Application

## Descripción

Esta es una aplicación de juego de ajedrez que utiliza Node.js con Express para el backend. La base de datos se gestiona utilizando Sequelize, y la autenticación de usuarios se maneja con JSON Web Tokens (JWT). Además, las contraseñas se encriptan utilizando bcrypt.

Los modelos creados en la aplicación son:

- **Game**: Representa una partida de ajedrez.
- **Player**: Representa a un jugador en la partida.
- **Move**: Representa un movimiento realizado en el juego.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Frontend**: React.js, CSS
- **Base de Datos**: PostgreSQL (gestionada con Sequelize)
- **Autenticación**: JWT
- **Encriptación de Contraseñas**: bcrypt
- **Docker**: Contenerización de la aplicación

## Requisitos Previos

- Asegúrate de tener [Docker](https://www.docker.com/get-started) instalado en tu máquina.
- Docker Compose para manejar múltiples contenedores.

## Configuración y Ejecución

1. **Clonar el repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. **Ejecutar el siguiente comando**:
   ```
     docker-compose up --build
   ```
