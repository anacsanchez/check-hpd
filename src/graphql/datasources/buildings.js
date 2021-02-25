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

    async getBuildingsByAddressInput({streetName, houseNumber, borough}) {
        const allParams = HPD_BUILDINGS_API.PARAMS;
        const apiQueryParams = [
            allParams.buildingId,
            allParams.houseNumber,
            allParams.streetName,
            allParams.zipCode,
            allParams.borough
        ];
        const query = encodeURI(`?$select=${apiQueryParams.join(',')} &$where=streetname like '%${streetName}%' AND housenumber = '${houseNumber}' ${ borough.length ? `AND boro like '%${borough}%'` : ''}`);
        const data = await this.get('', query);
        return data && data.length ? data.map(building => this.buildingReducer(building)) : [];
    }

    async getBuildingById(buildingId) {
        const query = encodeURI(`?$select=${Object.values(HPD_BUILDINGS_API.PARAMS).join(',')} &$where=buildingid = ${buildingId}`);
        const data = await this.get('', query);
        return data && data.length ? this.buildingReducer(data[0]) : {};
    }

    buildingReducer(data) {
        const apiParams = HPD_BUILDINGS_API.PARAMS;
        return {
            buildingId: data[apiParams.buildingId],
            address: {
                houseNumber: data[apiParams.houseNumber],
                streetName: data[apiParams.streetName],
                zipCode: data[apiParams.zipCode],
                borough: data[apiParams.borough],
            },
            legalStories: data[apiParams.legalStories]
        };
    }
}

module.exports = BuildingsAPI;