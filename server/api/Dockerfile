FROM node:11-slim

COPY script.sh .

RUN npm init -y
RUN npm install --save-dev chai
RUN npm install -g mocha

CMD ["sh", "script.sh"]
