FROM node:17

WORKDIR /home/node/app
COPY src src/
COPY public public/
COPY package.json .
COPY tsconfig.json .
COPY .env .

RUN npm config set unsafe-perm true
RUN npm i
RUN npm run build

CMD ["node", "build"]