module.exports = {
	Query: {
		getViolationsByAddress: async(_, { address }, { dataSources }) => {
			return dataSources.ViolationsAPI.getViolationsByAddress(address);
		},
		getBuildings: async(_, { address }, { dataSources }) => {
			return dataSources.BuildingsAPI.getBuildings(address);
		}
	},
	Building: {
		async violations(parent, __, {dataSources}) {
			const {buildingId} = parent;
			return dataSources.ViolationsAPI.getViolationsByBuildingId(buildingId);
		}
	}
};

