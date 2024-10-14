-- init.sql

-- Crear un nuevo usuario
CREATE ROLE admin WITH LOGIN PASSWORD 'password';

-- Crear la base de datos para pruebas
CREATE DATABASE mydatabase_test WITH OWNER admin;

-- Conectar a la base de datos de prueba
\c mydatabase_test;

-- Otorgar privilegios al usuario
GRANT ALL PRIVILEGES ON DATABASE mydatabase_test TO admin;
