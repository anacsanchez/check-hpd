const bent = require('bent');

const hpdHousingViolationsAPI = 'https://data.cityofnewyork.us/resource/wvxf-dwi5.json';
const hpdHousingComplaintsAPI = 'https://data.cityofnewyork.us/resource/uwyv-629c.json';
const hpdComplaintsAPI = 'https://data.cityofnewyork.us/resource/a2nx-4u46.json';


const apiRequest = async (url) => {
  const request = bent('GET', 'json');
  const responseData = await request(url, {}, { 'X-App-Token': process.env.API_TOKEN });
  return responseData;
};

const fetchAddressData = async(address) => {

  const [ houseNumber, ...streetName ] = address.split(' ');

  const apiViolationsUrl = `${hpdHousingViolationsAPI}?$where=streetname%20like%20%27%25${streetName.join(' ').toUpperCase()}%25%27%20AND%20housenumber%20=%20%27${houseNumber}%27`;

  const apiHousingComplaintsUrl = `${hpdHousingComplaintsAPI}?$where=streetname%20like%20%27%25${streetName.join(' ')}%25%27%20AND%20housenumber%20=%20%27${houseNumber}%27`;



  const housingViolationsData = await apiRequest(apiViolationsUrl) || [];
  const housingComplaintsData = await apiRequest(apiHousingComplaintsUrl) || [];

  if(housingComplaintsData && housingComplaintsData.length) {
    const complaintIds = housingComplaintsData.map(complaint => complaint.complaintid);

    const apiComplaintsUrl = `${hpdComplaintsAPI}?$where=complaintid%20in(${complaintIds.join(',')})`;

    const complaintsData = await apiRequest(apiComplaintsUrl);

    const completeData = housingComplaintsData.reduce()
  }

  return {
    housingViolations: housingViolationsData.length ? housingViolationsData : [],
    housingComplaints: housingComplaintsData.length ? housingComplaintsData : []
  };
};

module.exports = {
  fetchAddressData
};



