const { RESTDataSource} = require('apollo-datasource-rest');
const { HPD_VIOLATIONS_API } = require('../../constants');

class HousingViolationsAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = HPD_VIOLATIONS_API.URL;
	}

	willSendRequest(request) {
		return request.headers.set('X-App-Token', process.env.API_TOKEN);
	}

	async sendDataApiRequest(query) {
		const data = await this.get('', query);
		return data && data.length ? data.map(violation => this.housingViolationReducer(violation)) : [];
	}

	async getHousingViolationsByBuildingId(buildingId) {
		const violationsQuery = encodeURI(`?$select=${Object.values(HPD_VIOLATIONS_API.PARAMS).join(',')} &$where=buildingid = ${buildingId} AND inspectiondate > '2015-01-01T00:00:00' &$order=inspectiondate DESC`);
		return this.sendDataApiRequest(violationsQuery);
	}

	async getHousingViolationsByAddress(address) {
		const { houseNumber, streetName } = address;
		const violationsQuery = encodeURI(`?$select=${Object.values(HPD_VIOLATIONS_API.PARAMS).join(',')} &$where=streetname like '%${streetName.toUpperCase()}%' AND housenumber = '${houseNumber}' AND inspectiondate > '2015-01-01T00:00:00' &$order=inspectiondate DESC`);
		return this.sendDataApiRequest(violationsQuery);
	}

	housingViolationReducer(data) {
		const apiParams = HPD_VIOLATIONS_API.PARAMS;
		return {
			violationId: data[apiParams.violationId],
			buildingId: data[apiParams.buildingId],
			address: {
				houseNumber: data[apiParams.houseNumber],
				streetName: data[apiParams.streetName],
				zipCode: data[apiParams.zipCode],
				unit: data[apiParams.unit],
				story: data[apiParams.story],
				borough: data[apiParams.borough],
				neighborhood: data[apiParams.neighborhood]
			},
			violationClass: data[apiParams.violationClass],
			evaluationDates: {
				inspectionDate: data[apiParams.inspectionDate],
				approvedDate: data[apiParams.approvedDate],
				originalCertifyByDate: data[apiParams.originalCertifyByDate],
				originalCorrectByDate: data[apiParams.originalCorrectByDate],
				certifyByDate: data[apiParams.newCertifyByDate],
				correctByDate: data[apiParams.newCorrectByDate],
				certifiedDate: data[apiParams.certifiedDate]
			},
			issuedDate: data[apiParams.issuedDate],
			description: data[apiParams.description],
			type: data[apiParams.type],
			currentStatus: data[apiParams.currentStatus],
			statusUpdatedAt: data[apiParams.statusUpdatedAt],
			officialViolationStatus: data[apiParams.officialViolationStatus]
		};
	}
}

module.exports = HousingViolationsAPI;
