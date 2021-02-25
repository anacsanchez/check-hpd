// violations API: checks housing violations
// housing complaints API: checks housing complaints
// complaints API: detailed housing complaint information by complaint id

const HPD_VIOLATIONS_API = {
	URL: 'https://data.cityofnewyork.us/resource/wvxf-dwi5.json',
	PARAMS: {
		violationId: 'violationid',
		buildingId: 'buildingid',
		borough: 'boro',
		houseNumber: 'housenumber',
		streetName: 'streetname',
		zipCode: 'zip',
		unit: 'apartment',
		story: 'story',
		violationClass: 'class',
		inspectionDate: 'inspectiondate',
		approvedDate: 'approveddate',
		originalCertifyByDate: 'originalcertifybydate',
		originalCorrectByDate: 'originalcorrectbydate',
		newCertifyByDate: 'newcertifybydate',
		newCorrectByDate: 'newcorrectbydate',
		certifiedDate: 'certifieddate',
		description: 'novdescription',
		issuedDate: 'novissueddate',
		currentStatus: 'currentstatus',
		statusUpdatedAt: 'currentstatusdate',
		type: 'novtype',
		officialViolationStatus: 'violationstatus',
		neighborhood: 'nta'
		// lowHouseNumber: 'lowhousenumber',
		// highHouseNumber: 'highhousenumber',
		// streetCode: 'streetcode',
		// 'block',
		// 'lot',
		// 'latitude',
		// 'longitude',
	}
};

const HPD_HOUSING_COMPLAINTS_API = {
	URL: 'https://data.cityofnewyork.us/resource/uwyv-629c.json',
	PARAMS: {
		complaintId: 'complaintid',
		buildingId: 'buildingid',
		borough: 'borough',
		houseNumber: 'housenumber',
		streetName: 'streetname',
		zipCode: 'zip',
		unit: 'apartment',
		receivedDate: 'receiveddate',
		status: 'status',
		statusDate: 'statusdate'
		// 'block',
		// 'lot'
	}
};

const HPD_COMPLAINTS_PROBLEMS_API = {
	URL: 'https://data.cityofnewyork.us/resource/a2nx-4u46.json',
	PARAMS: {
		problemId: 'problemid',
		complaintId: 'complaintid',
		unitType: 'unittype',		//type of unit where complaint was reported
		spaceType: 'spacetype',	//type of space where complaint was reported
		severity: 'type',			//type of complaint/severity (Emergency, Immediate Emergency, etc)
		category: 'majorcategory',	//major category of the problem
		subCategory: 'minorcategory',	//minor category of the problem
		problemType: 'code',				//HPD code of complaint (Mice, Loose Door, etc)
		status: 'status',
		statusUpdatedAt: 'statusdate',
		statusDescription: 'statusdescription'
	}
};

const HPD_BUILDINGS_API = {
	URL: 'https://data.cityofnewyork.us/resource/kj4p-ruqc.json',
	PARAMS: {
		buildingId: 'buildingid',
		houseNumber: 'housenumber',
		streetName: 'streetname',
		zipCode: 'zip',
		borough: 'boro',
		legalStories: 'legalstories',	// Number of legal stories in a building
		buildingLifecycleStage: 'lifecycle', 	// The stage in the building life cycle (Building, Under Construction, Demolished, etc)
		recordStatus: 'recordstatus',
		numOfApts: 'legalclassa'	// The number of apartments in a multiple dwelling
	}
};

module.exports = {
	HPD_VIOLATIONS_API,
	HPD_HOUSING_COMPLAINTS_API,
	HPD_COMPLAINTS_PROBLEMS_API,
	HPD_BUILDINGS_API
};
