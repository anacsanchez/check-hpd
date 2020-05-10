const router = require('express').Router();
const { fetchAddressData } = require('./utils');

router.get('/hpd', async (req,res,next) => {
  try {
    const address = decodeURI(req.query.address);
    const addressData = await fetchAddressData(address);
    return res.status(200).send(addressData);
  } catch(err) {
    next({...err, message: err.headers['x-error-message'] });
  }
});

module.exports = router;
