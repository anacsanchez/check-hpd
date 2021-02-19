const { RESTDataSource } = require('apollo-datasource-rest');
const { HPD_COMPLAINTS_API } = require('../../constants');

class HousingComplaintDetailsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = HPD_COMPLAINTS_API.URL;
    }

    async getHousingComplaintDetails(complaintIds) {
        const query = `${HPD_COMPLAINTS_API.URL}?$select=${HPD_COMPLAINTS_API.PARAMS.join(',')} &$where=complaintid in(${complaintIds.join(',')}) &$order=statusdate DESC`;
        const data = await this.get('', encodeURI(query));


    }
}

module.exports = HousingComplaintDetailsAPI;