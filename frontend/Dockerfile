# Usa una imagen base de Node.js para construir la aplicación
FROM node:14 as build

# Crea y define el directorio de trabajo
WORKDIR /app

# Copia el archivo de definición de paquetes y lo instala
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Usa una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de la construcción de la aplicación al contenedor de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
