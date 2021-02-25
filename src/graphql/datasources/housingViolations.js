const { RESTDataSource} = require('apollo-datasource-rest');
const { HPD_VIOLATIONS_API: { URL: API_URL, PARAMS} } = require('../../constants');

class HousingViolationsAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = API_URL;
	}

	willSendRequest(request) {
		return request.headers.set('X-App-Token', process.env.API_TOKEN);
	}

	async sendDataApiRequest(query) {
		const data = await this.get('', query);
		return data && data.length ? data.map(violation => this.housingViolationReducer(violation)) : [];
	}

	async getHousingViolationsByBuildingId(buildingId) {
		const violationsQuery = encodeURI(`?$select=${Object.values(PARAMS).join(',')} &$where=${PARAMS.buildingId} = ${buildingId} AND ${PARAMS.inspectionDate} > '2015-01-01T00:00:00' &$order=${PARAMS.inspectionDate} DESC`);
		return this.sendDataApiRequest(violationsQuery);
	}

	async getHousingViolationsByAddress(address) {
		const { houseNumber, streetName } = address;
		const violationsQuery = encodeURI(`?$select=${Object.values(PARAMS).join(',')} &$where=${PARAMS.streetName} like '%${streetName.toUpperCase()}%' AND ${PARAMS.houseNumber} = '${houseNumber}' AND ${PARAMS.inspectionDate} > '2015-01-01T00:00:00' &$order=${PARAMS.inspectionDate} DESC`);
		return this.sendDataApiRequest(violationsQuery);
	}

	housingViolationReducer(data) {
		return {
			violationId: data[PARAMS.violationId],
			buildingId: data[PARAMS.buildingId],
			address: {
				houseNumber: data[PARAMS.houseNumber],
				streetName: data[PARAMS.streetName],
				zipCode: data[PARAMS.zipCode],
				unit: data[PARAMS.unit],
				story: data[PARAMS.story],
				borough: data[PARAMS.borough],
				neighborhood: data[PARAMS.neighborhood]
			},
			violationClass: data[PARAMS.violationClass],
			evaluationDates: {
				inspectionDate: data[PARAMS.inspectionDate],
				approvedDate: data[PARAMS.approvedDate],
				originalCertifyByDate: data[PARAMS.originalCertifyByDate],
				originalCorrectByDate: data[PARAMS.originalCorrectByDate],
				certifyByDate: data[PARAMS.newCertifyByDate],
				correctByDate: data[PARAMS.newCorrectByDate],
				certifiedDate: data[PARAMS.certifiedDate]
			},
			issuedDate: data[PARAMS.issuedDate],
			description: data[PARAMS.description],
			type: data[PARAMS.type],
			currentStatus: data[PARAMS.currentStatus],
			statusUpdatedAt: data[PARAMS.statusUpdatedAt],
			officialViolationStatus: data[PARAMS.officialViolationStatus]
		};
	}
}

module.exports = HousingViolationsAPI;
