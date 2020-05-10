require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3050;
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiRouter = require('./api');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',apiRouter);

app.use(express.static(path.join(__dirname, '..','..','public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public','index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
