FROM node:11-slim

COPY script.sh .

COPY package.json .
RUN npm install --save-dev chai
RUN npm install -g mocha

CMD ["sh", "script.sh"]
