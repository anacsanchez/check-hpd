const { RESTDataSource } = require('apollo-datasource-rest');
const { HPD_HOUSING_COMPLAINTS_API } = require('../../constants');

class HousingComplaintsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = HPD_HOUSING_COMPLAINTS_API.URL;
    }

    async getHousingComplaintsByBuildingId(buildingId) {
        const query = encodeURI(`?$select=${Object.values(HPD_HOUSING_COMPLAINTS_API.PARAMS).join(',')} &$where=buildingid = ${buildingId}`);
        const data = await this.get('', query);
    }
}

module.exports = HousingComplaintsAPI;