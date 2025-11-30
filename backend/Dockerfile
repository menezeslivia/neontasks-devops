# Usa uma imagem base oficial do Node.js (leve)
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto de forma reprodutível
RUN npm ci --legacy-peer-deps

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que o Express usará (ex: 3000)
EXPOSE 3000

# Define o comando para rodar a aplicação ao iniciar o container
CMD [ "npm", "start" ]