FROM node:20-alpine3.17 as build
#FROM node:20-alpine3.17 AS builder

WORKDIR /home

COPY package*.json ./
COPY prisma ./prisma
COPY .env ./
COPY tsconfig.json ./

RUN npm install
#RUN npx prisma generate

COPY . .

RUN npm run build

#FROM node:20-alpine3.17 

#COPY --from=build /home/node_modules ./node_modules
#COPY --from=build /home/package*.json ./
#COPY --from=build /home/dist ./dist
#COPY --from=build /home/prisma ./prisma

EXPOSE 3000

#CMD [ "npm", "run", "start:migrate:prod" ]

CMD [ "node", "./dist/index.js" ]