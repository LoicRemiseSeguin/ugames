FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["entrypoint.sh"]
CMD ["npm", "run", "dev"]
