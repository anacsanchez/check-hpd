// violations API: checks housing violations
// housing complaints API: checks housing complaints
// complaints API: detailed housing complaint information by complaint id

const HPD_VIOLATIONS_API = {
	URL: 'https://data.cityofnewyork.us/resource/wvxf-dwi5.json',
	PARAMS: [
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
	]
};

const HPD_HOUSING_COMPLAINTS_API = {
	URL: 'https://data.cityofnewyork.us/resource/uwyv-629c.json',
	PARAMS: [
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
};

const HPD_COMPLAINTS_API = {
	URL: 'https://data.cityofnewyork.us/resource/a2nx-4u46.json',
	PARAMS: [
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
	]
};

const HPD_BUILDINGS_API = {
	URL: 'https://data.cityofnewyork.us/resource/kj4p-ruqc.json',
	PARAMS: [
		'buildingid',
		'housenumber',
		'streetname',
		'zip',
		'boro',
		'legalstories',	// Number of legal stories in a building
		'lifecycle', 	// The stage in the building life cycle (Building, Under Construction, Demolished, etc)
		'recordstatus',
		'legalclassa'	// The number of apartments in a multiple dwelling
	]
};

module.exports = {
	HPD_VIOLATIONS_API,
	HPD_HOUSING_COMPLAINTS_API,
	HPD_COMPLAINTS_API,
	HPD_BUILDINGS_API
};
