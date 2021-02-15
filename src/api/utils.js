const bent = require('bent');
const {
	HPD_VIOLATIONS_API,
	HPD_HOUSING_COMPLAINTS_API,
	HPD_COMPLAINTS_API
} = require('../constants');
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

  const apiViolationsUrl = HPD_VIOLATIONS_API.URL + encodeURI(`?$select=${HPD_VIOLATIONS_API.PARAMS.join(',')} &$where=streetname like '%${streetName.join(' ').toUpperCase()}%' AND housenumber = '${houseNumber}' AND inspectiondate > '2015-01-01T00:00:00' &$order=inspectiondate DESC`);

  const apiHousingComplaintsUrl = HPD_HOUSING_COMPLAINTS_API.URL + encodeURI(`?$select=${HPD_HOUSING_COMPLAINTS_API.PARAMS.join(',')} &$where=streetname like '%${validStreetName}%' AND housenumber = '${houseNumber}' AND receiveddate > '2015-01-01T00:00:00' &$order=receiveddate DESC`);

  const housingData = {};

  const housingViolationsData = await nycApiRequest(apiViolationsUrl);
  const housingComplaintsData = await nycApiRequest(apiHousingComplaintsUrl);

  housingData.violations = housingViolationsData.length ? housingViolationsData : [];

  if(housingComplaintsData.length) {
    const complaintIds = housingComplaintsData.map(complaint => complaint.complaintid);

    const apiComplaintsUrl = `${HPD_COMPLAINTS_API.URL}?$select=${HPD_COMPLAINTS_API.PARAMS.join(',')} &$where=complaintid in(${complaintIds.join(',')}) &$order=statusdate DESC`;

    const complaintsData = await nycApiRequest(apiComplaintsUrl);

    const completeComplaintsData = mergeHousingComplaintsData(housingComplaintsData, complaintsData);

    housingData.complaints = completeComplaintsData;
  }
  else {
    housingData.complaints = [];
  }

  return groupByAddress(housingData);

};

const mergeHousingComplaintsData = (houseComplaints,complaints) => {
  const housingComplaintsObj = houseComplaints.reduce((obj, curr) => ({ [curr.complaintid]: curr, ...obj }),{});

  const mergedComplaintsData = complaints.map((complaint) => ({ ...housingComplaintsObj[complaint.complaintid], ...complaint}));

  return mergedComplaintsData;
};

const groupByAddress = ({ violations, complaints }) => {

  const issuesByAddress = new Map();

  for(let violation of violations) {
    const formattedIssue = violationReducer(violation);

    if(issuesByAddress.has(formattedIssue.address)) {
      const currentAddressObj = issuesByAddress.get(formattedIssue.address);
      issuesByAddress.set(formattedIssue.address, { violations: [ ...currentAddressObj.violations, formattedIssue ] });
    }
    else {
      issuesByAddress.set(formattedIssue.address, { violations: [ formattedIssue ]})
    }
  }

  for(let complaint of complaints) {
    const formattedIssue = complaintReducer(complaint);

    if(!issuesByAddress.has(formattedIssue.address)) {
      issuesByAddress.set(formattedIssue.address, { complaints: [ formattedIssue ]})
    }
    else if(issuesByAddress.has(formattedIssue.address) && !issuesByAddress.get(formattedIssue.address).complaints) {
      const currentAddressObj = issuesByAddress.get(formattedIssue.address);
      issuesByAddress.set(formattedIssue.address, { ...currentAddressObj, complaints: [ formattedIssue ] } )
    }
    else {
      const currentAddressObj = issuesByAddress.get(formattedIssue.address);
      issuesByAddress.set(formattedIssue.address, { ...currentAddressObj, complaints: [ ...currentAddressObj.complaints, formattedIssue ] } )
    }
  }

  return [ ...issuesByAddress ]
}

module.exports = {
  fetchAddressData
};
