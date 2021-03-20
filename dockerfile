FROM node:14
COPY . .
RUN npm i && npm run build

EXPOSE 5050
CMD ["npm", "run", "start:prod"]