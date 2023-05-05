const express = require('express');
const mongoose = require('mongoose');

const router= require('./Router/user.router')
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI





mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

app.use(cors());
app.use(express.json());


app.use('/user', router)


app.listen(PORT, () => {
console.log(`Server listening on port ${PORT} hello`);
});

