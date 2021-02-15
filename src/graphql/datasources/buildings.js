const { RESTDataSource} = require('apollo-datasource-rest');
const { HPD_BUILDINGS_API } = require('../../constants');

class BuildingsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = HPD_BUILDINGS_API.URL;
    }

    willSendRequest(request) {
        return request.headers.set('X-App-Token', process.env.API_TOKEN);
    }

    async getBuildings({ streetName, houseNumber }) {
        const query = encodeURI(`?$select=${HPD_BUILDINGS_API.PARAMS.join(',')} &$where=streetname like '%${streetName.toUpperCase()}%' AND housenumber = '${houseNumber}'`);
        const data = await this.get('', query);
        return data && data.length ? data.map(building => this.buildingReducer(building)) : [];
    }

    buildingReducer(data) {
        return {
            buildingId: data.buildingid
        };
    }
}

module.exports = BuildingsAPI;