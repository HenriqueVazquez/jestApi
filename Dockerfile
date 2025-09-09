# Use Node 20 como base
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia todo o código
COPY . .

# Compila TypeScript
RUN npm run build

# Expõe porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
