# ETAPA 1: BUILD (Compilação do React)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json e instala dependências (assume que o contexto de build é ./frontend)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copia o restante do código-fonte
COPY . .

# Compila a aplicação para arquivos estáticos (Vite produz a pasta /dist)
RUN npm run build

# ETAPA 2: SERVIDOR (Servir a aplicação estática)
FROM nginx:alpine

# Limpa a pasta padrão e copia a build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx para habilitar proxy /api -> backend
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]