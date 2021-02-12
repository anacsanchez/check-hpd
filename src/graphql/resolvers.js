module.exports = {
	Query: {
		getViolations: async(_, { address }, { dataSources }) => {
			return dataSources.ViolationsAPI.getViolations(address);
		}
	}
};
