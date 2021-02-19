module.exports = {
	Query: {
		// getHousingViolationsByAddress: async(_, { address }, { dataSources }) => {
		// 	return dataSources.HousingViolationsAPI.getHousingViolationsByAddress(address);
		// },
		checkAddress: async(_, { address }, { dataSources }) => {
			return dataSources.BuildingsAPI.getBuildings(address);
		}
	},
	Building: {
		async violations({ buildingId }, __, { dataSources }) {
			return dataSources.HousingViolationsAPI.getHousingViolationsByBuildingId(buildingId);
		}
	}
};

