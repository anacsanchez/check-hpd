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
}

module.exports = ViolationsAPI;
