require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3050;
const path = require('path');
const morgan = require('morgan');
const { fetchAddressData } = require('./utils');

app.use(morgan('dev'));

app.get('/api/hpd', async (req,res,next) => {
  try {
    const addressData = await fetchAddressData(req.query.address);
    return res.status(200).send(addressData);
  } catch(err) {
    next({...err, message: err.headers['x-error-message'] });
  }
});

app.use(express.static(path.join('..','..','public')));

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.statusCode || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
