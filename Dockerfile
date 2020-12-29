FROM node:14.15.3-alpine
WORKDIR /usr/app
COPY . ./
RUN npm install --only=production
RUN npm run build
CMD ["npm", "run", "start"]
