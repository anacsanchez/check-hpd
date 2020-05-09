require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3050;
const path = require('path');
const morgan = require('morgan');
const { fetchAddressData } = require('./utils');


app.use(morgan('dev'));

app.get('/api', async (req,res,next) => {
  console.log(req.query);

  const addressData = await fetchAddressData(req.query.address);

  return res.send(addressData);
});

app.use(express.static(path.join('..','..','public')));

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.status || 500,err.message || 'Internal server error.');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
