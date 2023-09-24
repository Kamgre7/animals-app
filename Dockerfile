FROM node:20-alpine3.17

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY prisma ./prisma
COPY .env .
COPY tsconfig.json .

RUN npm install 
RUN npx prisma generate

COPY . ./

RUN npm run build

ENV PORT ${PORT}
EXPOSE $PORT

CMD [ "node", "./dist/index.js" ]