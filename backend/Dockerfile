# Use uma imagem base oficial do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto, incluindo as devDependencies
RUN npm install

# Instale o TypeScript globalmente
RUN npm install -g typescript

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Compile o TypeScript para JavaScript
RUN tsc

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3000

# Instale nodemon globalmente
RUN npm install -g nodemon

# Comando para iniciar a aplicação
CMD ["nodemon", "dist/server.js"]
