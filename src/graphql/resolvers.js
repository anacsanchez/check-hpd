module.exports = {
	Query: {
		getBuildingById: async(_, { id }, { dataSources }) => {
			return dataSources.BuildingsAPI.getBuildingById(id);
		},
		getBuildingsByAddressInput: async(_, { address }, { dataSources }) => {
			const parsedAddress = address.match(/^(?<houseNumber>[\w\d-]+)\s(?<streetName>[\w\d\s]+)?(?:#(?:[\w\d]+)?)?(?:[,\s]+(?<borough>\w+))?.*/);
			const { houseNumber, streetName, borough } = parsedAddress.groups;
			return dataSources.BuildingsAPI.getBuildingsByAddressInput({
				houseNumber: houseNumber.trim().toUpperCase(),
				streetName: streetName.trim().toUpperCase(),
				borough: borough ? borough.trim().toUpperCase() : ''
			});
		}
	},
	Building: {
		async violations({ buildingId }, __, { dataSources }) {
			return dataSources.HousingViolationsAPI.getHousingViolationsByBuildingId(buildingId);
		}
	}
};

