FROM node:lts-alpine

WORKDIR /app

# Projekt reinkopieren
COPY . .

# Installieren
RUN npm install

EXPOSE 3000

# Dev-Server starten
CMD ["npm", "run", "dev"]

