# Usa una imagen de Node.js
FROM node:18

# Crea y define el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Ejecutar la aplicación
CMD ["npm", "start"]
