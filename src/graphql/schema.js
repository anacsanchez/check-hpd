const gql = require('graphql-tag');

const typeDefs = gql`

	type Query {
		checkAddress(address: AddressInput): HPDResults
#		violations(address: AddressInput): [HousingViolation]
		#buildings(address: AddressInput): [Building]
#		getHousingComplaintsByAddress(address: AddressInput): [HousingComplaint]
	}

	type HPDResults {
		buildings: [Building!]
		violations: [HousingViolation]
		complaints: [HousingComplaint]
	}

	type Building {
		buildingId: Int
		address: Address
		violations: [HousingViolation]
		complaints: [HousingComplaint]
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

	type HousingComplaintDetails {
		complaintId: Int!
		problemId: Int
		unitType: String
		spaceType: String
		severity: String
		category: String
		subCategory: String
		classification: String
		statusDescription: String
	}
	
	type HousingComplaint {
		buildingId: Int!
		complaintId: Int!
		address: Address
		receivedDate: String
		status: String
		statusUpdatedAt: String
		complaintDetails: HousingComplaintDetails
	}

	type Address {
		houseNumber: String!
		streetName: String!
		zipCode: Int!
		unit: String
		story: String
		borough: String
		neighborhood: String
	}

	input AddressInput {
		houseNumber: String!
		streetName: String!
		borough: String
		zipCode: Int
		apartment: String
		story: String
	}
`;

module.exports = {
	typeDefs
};
