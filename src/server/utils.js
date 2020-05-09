const bent = require('bent');

const hpdHousingViolationsAPI = 'https://data.cityofnewyork.us/resource/wvxf-dwi5.json';
const hpdHousingComplaintsAPI = 'https://data.cityofnewyork.us/resource/uwyv-629c.json';
const hpdComplaintsAPI = 'https://data.cityofnewyork.us/resource/a2nx-4u46.json';


const apiRequest = async (url) => {
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

  const apiViolationsUrl = `${hpdHousingViolationsAPI}?$where=streetname%20like%20%27%25${streetName.join(' ').toUpperCase()}%25%27%20AND%20housenumber%20=%20%27${houseNumber}%27&$order=inspectiondate%20DESC`;

  const apiHousingComplaintsUrl = `${hpdHousingComplaintsAPI}?$where=streetname%20like%20%27%25${streetName.join(' ').toUpperCase()}%25%27%20AND%20housenumber%20=%20%27${houseNumber}%27&$order=statusdate%20DESC`;

  const housingData = {};

  const housingViolationsData = await apiRequest(apiViolationsUrl);
  const housingComplaintsData = await apiRequest(apiHousingComplaintsUrl);

  housingData.violations = housingViolationsData.length ? housingViolationsData : [];

  if(housingComplaintsData.length) {
    const complaintIds = housingComplaintsData.map(complaint => complaint.complaintid);

    const apiComplaintsUrl = `${hpdComplaintsAPI}?$where=complaintid%20in(${complaintIds.join(',')})`;

    const complaintsData = await apiRequest(apiComplaintsUrl);

    housingData.complaints = complaintsData ? mergeHousingComplaintsData(housingComplaintsData, complaintsData) : [];
  }
  else {
    housingData.complaints = [];
  }

  return housingData;
};

const mergeHousingComplaintsData = (houseComplaints,complaints) => {
  const housingComplaintsObj = houseComplaints.reduce((obj, curr) => ({ [curr.complaintid]: curr, ...obj }));
  const mergedComplaintsData = complaints.map((complaint) => ({ ...housingComplaintsObj[complaint.complaintid], ...complaint}));

  return mergedComplaintsData;
};

module.exports = {
  fetchAddressData
};



