const { RESTDataSource} = require('apollo-datasource-rest');
const { HPD_VIOLATIONS_API } = require('../../constants');

class ViolationsAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = HPD_VIOLATIONS_API.URL;
	}

	willSendRequest(request) {
		return request.headers.set('X-App-Token', process.env.API_TOKEN);
	}

	async sendDataApiRequest(query) {
		const data = await this.get('', query);
		return data && data.length ? data.map(violation => this.violationReducer(violation)) : [];
	}

	async getViolationsByAddress(address) {
		const { houseNumber, streetName } = address;
		const violationsQuery = encodeURI(`?$select=${HPD_VIOLATIONS_API.PARAMS.join(',')} &$where=streetname like '%${streetName.toUpperCase()}%' AND housenumber = '${houseNumber}' AND inspectiondate > '2015-01-01T00:00:00' &$order=inspectiondate DESC`);
		return this.sendDataApiRequest(violationsQuery);
	}

	async getViolationsByBuildingId(buildingId) {
		const violationsQuery = encodeURI(`?$select=${HPD_VIOLATIONS_API.PARAMS.join(',')} &$where=buildingid = ${buildingId} AND inspectiondate > '2015-01-01T00:00:00' &$order=inspectiondate DESC`);
		return this.sendDataApiRequest(violationsQuery);
	}

	violationReducer(data) {
		return {
			violationId: data.violationid,
			buildingId: data.buildingid,
			address: {
				houseNumber: data.housenumber,
				streetName: data.streetname,
				zipCode: data.zip,
				unit: data.apartment,
				story: data.story,
				borough: data.boro,
				neighborhood: data.nta
			},
			class: data.class,
			evaluationDates: {
				inspectionDate: data.inspectiondate,
				approvedDate: data.approveddate,
				originalCertifyByDate: data.originalcertifybydate,
				originalCorrectByData: data.originalcorrectbydate,
				certifyByDate: data.newcertifybydate,
				correctByDate: data.newcorrectbydate,
				certifiedDate: data.certifieddate
			},
			issuedDate: data.novissueddate,
			description: data.novdescription,
			type: data.novtype,
			currentStatus: data.currentstatus,
			statusUpdatedAt: data.currentstatusdate,
			officialViolationStatus: data.violationstatus
		};
	}
}

module.exports = ViolationsAPI;
