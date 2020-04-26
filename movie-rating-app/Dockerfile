FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY ./ ./
CMD ["sh","./frontend.sh"]

#docker build -t swar23/movie-react-app .
#docker run -p 3000:3000 swar23/movie-react-app
# check on localhost:3000