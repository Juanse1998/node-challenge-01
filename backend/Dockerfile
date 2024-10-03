# Usa una imagen de Node.js
FROM node:18

# Instala el cliente de PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Crea y define el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Ejecutar la aplicación
CMD ["npm", "start"]
