FROM node:15

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
RUN npx sequelize db:migrate
#CMD ["ls"]
CMD ["node","index.js"]