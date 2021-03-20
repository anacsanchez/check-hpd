const { RESTDataSource} = require('apollo-datasource-rest');
const { HPD_BUILDINGS_API: { URL: API_URL, PARAMS } } = require('../../constants');

class BuildingsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = API_URL;
    }

    willSendRequest(request) {
        return request.headers.set('X-App-Token', process.env.API_TOKEN);
    }

    async getBuildingsByAddressInput({streetName, houseNumber, borough}) {
        const apiSelectParams = [
            PARAMS.buildingId,
            PARAMS.houseNumber,
            PARAMS.streetName,
            PARAMS.zipCode,
            PARAMS.borough
        ];
        const query = encodeURI(`?$select=${apiSelectParams.join(',')} &$where=${PARAMS.streetName} like '${streetName}%' AND ${PARAMS.houseNumber} = '${houseNumber}' ${borough.length ? `AND ${PARAMS.borough} like '%${borough}%'` : ''} &$limit=10 &$order=${PARAMS.streetName} ASC`);
        const data = await this.get('', query);
        return data && data.length ? data.map(building => this.buildingReducer(building)) : [];
    }

    async getBuildingById(buildingId) {
        const query = encodeURI(`?$select=${Object.values(PARAMS).join(',')} &$where=${PARAMS.buildingId} = ${buildingId}`);
        const data = await this.get('', query);
        return data && data.length ? this.buildingReducer(data[0]) : {};
    }

    buildingReducer(data) {
        return {
            buildingId: data[PARAMS.buildingId],
            address: {
                houseNumber: data[PARAMS.houseNumber],
                streetName: data[PARAMS.streetName],
                zipCode: data[PARAMS.zipCode],
                borough: data[PARAMS.borough]
            },
            legalStories: data[PARAMS.legalStories],
            numOfApts: data[PARAMS.numOfApts],
            recordStatus: data[PARAMS.recordStatus]
        };
    }
}

module.exports = BuildingsAPI;