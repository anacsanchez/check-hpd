const { RESTDataSource} = require('apollo-datasource-rest');
const { HPD_VIOLATIONS_API } = require('../../constants');

class ViolationsAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = HPD_VIOLATIONS_API.URL;
	}

	async getViolations(address) {
		const { houseNumber, streetName } = address;
		const violationsQuery = encodeURI(`?$select=${HPD_VIOLATIONS_API.PARAMS.join(',')} &$where=streetname like '%${streetName.toUpperCase()}%' AND housenumber = '${houseNumber}' AND inspectiondate > '2015-01-01T00:00:00' &$order=inspectiondate DESC`);
		return this.get('', violationsQuery);
	}

	async violationReducer(data) {
		return {
			violationId: data.violationid,
			buildingId: data.buildingid,
			address: {
				houseNumber: data.housenumber,
				streetName: data.streetname,
				zipCode: data.zip,
				unit: data.apartment,
				story: data.story,
				neighborhood: data.nta,
				borough: data.boro
			},
			violationClass: data.class,
			hpdDates: {
				inspectionDate: data.inspectiondate,
				approvedDate: data.approveddate,
				originalCertifyByDate: data.originalcertifybydate,
				originalCorrectByDate: data.originalcorrectbydate,
				certifyByDate: data.newcertifybydate,
				correctByDate: data.newcorrectbydate,
				certifiedDate: data.certifieddate
			},
			issuedDate: data.novissueddate,
			description: data.novdescription,
			status: data.currentstatus,
			lastUpdated: data.currentstatusdate,
			issuedType: data.novtype,


		}

		return {
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
		}
	}
}

module.exports = ViolationsAPI;
