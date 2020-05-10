const hpdHousingViolationsAPI = 'https://data.cityofnewyork.us/resource/wvxf-dwi5.json';
const hpdHousingComplaintsAPI = 'https://data.cityofnewyork.us/resource/uwyv-629c.json';
const hpdComplaintsAPI = 'https://data.cityofnewyork.us/resource/a2nx-4u46.json';

const violationsFields = [
  'violationid',
  'buildingid',
  'boro',
  'housenumber',
  // 'lowhousenumber',
  // 'highhousenumber',
  'streetname',
  // 'streetcode',
  'zip',
  'apartment',
  'story',
  // 'block',
  // 'lot',
  'class',
  'inspectiondate',
  'approveddate',
  'originalcertifybydate',
  'originalcorrectbydate',
  'newcertifybydate',
  'newcorrectbydate',
  'certifieddate',
  'novdescription',
  'novissueddate',
  'currentstatus',
  'currentstatusdate',
  'novtype',
  'violationstatus',
  // 'latitude',
  // 'longitude',
  'nta'
];

const housingComplaintsFields = [
  'complaintid',
  'buildingid',
  'borough',
  'housenumber',
  'streetname',
  'zip',
  // 'block',
  // 'lot',
  'apartment',
  'receiveddate',
  'status',
  'statusdate'
]

const complaintsFields = [
  'problemid',
  'complaintid',
  'unittype',
  'spacetype',
  'type',
  'majorcategory',
  'minorcategory',
  'code',
  'status',
  'statusdate',
  'statusdescription'
];

module.exports = {
  hpdHousingViolationsAPI,
  hpdHousingComplaintsAPI,
  hpdComplaintsAPI,
  violationsFields,
  housingComplaintsFields,
  complaintsFields
};
