FROM node:11-slim

COPY script.sh .

CMD ["sh", "script.sh"]
