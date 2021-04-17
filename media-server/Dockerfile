FROM node:15

WORKDIR /app
COPY package-lock.json /app/
RUN npm install
COPY . /app
#RUN npx http-server -p 4343
#CMD ["ls"]
CMD ["npx","http-server","-p","4343"]