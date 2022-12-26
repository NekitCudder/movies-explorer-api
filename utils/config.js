const { NODE_ENV, DB_URL, PORT = 3000 } = process.env;
const dataBase = NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesdb';

module.exports = { dataBase, PORT };
