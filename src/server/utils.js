const bent = require('bent');

const hpdHousingViolationsAPI = 'https://data.cityofnewyork.us/resource/wvxf-dwi5.json';
const hpdHousingComplaintsAPI = 'https://data.cityofnewyork.us/resource/uwyv-629c.json';
const hpdComplaintsAPI = 'https://data.cityofnewyork.us/resource/a2nx-4u46.json';

const violationsFields = 'violationid,buildingid,boro,housenumber,lowhousenumber,highhousenumber,streetname,streetcode,zip,apartment,story,block,lot,class,inspectiondate,approveddate,originalcertifybydate,originalcorrectbydate,newcertifybydate,newcorrectbydate,certifieddate,novdescription,novissueddate,currentstatus,currentstatusdate,novtype,violationstatus,latitude,longitude,nta';

const housingComplaintsFields = 'complaintid,buildingid,borough,housenumber,streetname,zip,block,lot,apartment,receiveddate,status,statusdate';

const complaintsFields = 'problemid,complaintid,unittype,spacetype,type,majorcategory,minorcategory,code,status,statusdate,statusdescription';

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

  const apiViolationsUrl = hpdHousingViolationsAPI + encodeURI(`?$select=${violationsFields} &$where=streetname like '%${streetName.join(' ').toUpperCase()}%' AND housenumber = '${houseNumber}' &$order=inspectiondate DESC`);

  const apiHousingComplaintsUrl = hpdHousingComplaintsAPI + encodeURI(`?$select=${housingComplaintsFields} &$where=streetname like '%${validStreetName}%' AND housenumber = '${houseNumber}'&$order=statusdate DESC`);

  const housingData = {};

  const housingViolationsData = await nycApiRequest(apiViolationsUrl);
  const housingComplaintsData = await nycApiRequest(apiHousingComplaintsUrl);

  housingData.violations = housingViolationsData.length ? housingViolationsData : [];

  if(housingComplaintsData.length) {
    const complaintIds = housingComplaintsData.map(complaint => complaint.complaintid);

    const apiComplaintsUrl = `${hpdComplaintsAPI}?$select=${complaintsFields}&$where=complaintid%20in(${complaintIds.join(',')})`;

    const complaintsData = await nycApiRequest(apiComplaintsUrl);

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



