const gql = require('graphql-tag');

const typeDefs = gql`

	type Query {
		getBuildingsByAddressInput(address: String): [BuildingSearchResult]
		getBuildingById(id: ID): Building
	}
	
	type Building {
		buildingId: Int!
		address: Address
		legalStories: String
		violations: [HousingViolation]
		complaints: [HousingComplaint]
	}
	
	type BuildingSearchResult {
		buildingId: Int!
		address: AddressSearchResult
	}
	
	type AddressSearchResult {
		houseNumber: String!
		streetName: String!
		borough: String
		zipCode: Int
	}

	type Address {
		houseNumber: String!
		streetName: String!
		zipCode: Int
		unit: String
		story: String
		borough: String
		neighborhood: String
	}
	
	type HousingViolation {
		violationId: String
		buildingId: Int!
		address: Address
		evaluationDates: HousingViolationEvaluationDates
		issuedDate: String
		description: String
		type: String
		class: String
		currentStatus: String
		statusUpdatedAt: String
		officialViolationStatus: String
	}
	
	type HousingViolationEvaluationDates {
		inspectionDate: String
		approvedDate: String
		originalCertifyByDate: String
		originalCorrectByData: String
		certifyByDate: String
		correctByDate: String
		certifiedDate: String
	}
	
	type HousingComplaint {
		buildingId: Int!
		complaintId: Int!
		address: Address
		receivedDate: String
		status: String
		statusUpdatedAt: String
		problems: [ComplaintProblem]
	}

	type ComplaintProblem {
		complaintId: Int!
		problemId: Int!
		unitType: String
		spaceType: String
		severity: String
		category: String
		subCategory: String
		problemType: String
		status: String
		statusUpdatedAt: String
		statusDescription: String
	}
	
`;

module.exports = {
	typeDefs
};
