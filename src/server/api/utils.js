const bent = require('bent');
const {
  hpdHousingViolationsAPI,
  hpdHousingComplaintsAPI,
  hpdComplaintsAPI,
  violationsFields,
  housingComplaintsFields,
  complaintsFields
} = require('./constants');
const { violationReducer, complaintReducer } = require('./reducers');

const nycApiRequest = async (url) => {
  const request = bent('GET', 'json');

  try {
    const responseData = await request(url, {}, { 'X-App-Token': process.env.API_TOKEN });
    return responseData;
  } catch(err) {
    throw err;
  }
};

const fetchAddressData = async(address) => {

  const [ houseNumber, ...streetName ] = address.split(' ');
  const validStreetName = streetName.join(' ').toUpperCase();

  const apiViolationsUrl = hpdHousingViolationsAPI + encodeURI(`?$select=${violationsFields.join(',')} &$where=streetname like '%${streetName.join(' ').toUpperCase()}%' AND housenumber = '${houseNumber}' &$order=inspectiondate DESC`);

  const apiHousingComplaintsUrl = hpdHousingComplaintsAPI + encodeURI(`?$select=${housingComplaintsFields.join(',')} &$where=streetname like '%${validStreetName}%' AND housenumber = '${houseNumber}'&$order=receiveddate DESC`);

  const housingData = {};

  const housingViolationsData = await nycApiRequest(apiViolationsUrl);
  const housingComplaintsData = await nycApiRequest(apiHousingComplaintsUrl);

  const housingViolations = housingViolationsData.length ? housingViolationsData.map((violation) => violationReducer(violation)) : [];

  housingData.violations = housingViolations;

  if(housingComplaintsData.length) {
    const complaintIds = housingComplaintsData.map(complaint => complaint.complaintid);

    const apiComplaintsUrl = `${hpdComplaintsAPI}?$select=${complaintsFields.join(',')}&$where=complaintid%20in(${complaintIds.join(',')})&$order=statusdate DESC`;

    const complaintsData = await nycApiRequest(apiComplaintsUrl);

    const completeComplaintsData = mergeHousingComplaintsData(housingComplaintsData, complaintsData);

    housingData.complaints = completeComplaintsData.map(complaint => complaintReducer(complaint));
  }
  else {
    housingData.complaints = [];
  }

  return housingData;
};

const mergeHousingComplaintsData = (houseComplaints,complaints) => {
  const housingComplaintsObj = houseComplaints.reduce((obj, curr) => ({ [curr.complaintid]: curr, ...obj }),{});

  const mergedComplaintsData = complaints.map((complaint) => ({ ...housingComplaintsObj[complaint.complaintid], ...complaint}));

  return mergedComplaintsData;
};

module.exports = {
  fetchAddressData
};


