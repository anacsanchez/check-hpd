const { RESTDataSource } = require('apollo-datasource-rest');
const { HPD_HOUSING_COMPLAINTS_API: {URL: API_URL, PARAMS } } = require('../../constants');

class HousingComplaintsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = API_URL;
    }

    async getHousingComplaintsByBuildingId(buildingId) {
        const query = encodeURI(`?$select=${Object.values(PARAMS).join(',')} &$where=${PARAMS.buildingId} = ${buildingId} &$order=${PARAMS.receivedDate} DESC`);
        const data = await this.get('', query);
        return data && data.length ? data.map(complaint => this.housingComplaintReducer(complaint)): [];
    }

    housingComplaintReducer(data) {
        return {
            buildingId: data[PARAMS.buildingId],
            complaintId: data[PARAMS.complaintId],
            borough: data[PARAMS.borough],
            houseNumber: data[PARAMS.houseNumber],
            streetName: data[PARAMS.streetName],
            zipCode: data[PARAMS.zipCode],
            unit: data[PARAMS.unit],
            receivedDate: data[PARAMS.receivedDate],
            status: data[PARAMS.status],
            statusUpdatedAt: data[PARAMS.statusUpdatedAt]
        };
    }
}

module.exports = HousingComplaintsAPI;