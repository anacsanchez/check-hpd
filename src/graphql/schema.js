const gql = require('graphql-tag');

const typeDefs = gql`

	type Query {
		address(address: AddressInput): [HPDResult]
		getViolationsByAddress(address: AddressInput): [Violation]
		getBuildings(address: AddressInput): [Building]
	}

	type HPDResult {
		results: [Building]
	}

	type Building {
		buildingId: Int
		address: Address
		violations: [Violation]
#		complaints: [Complaint]
	}

	type Violation {
		violationId: String
		buildingId: Int!
		address: Address
		evaluationDates: EvaluationDates
		issuedDate: String
		description: String
		type: String
		class: String
		currentStatus: String
		statusUpdatedAt: String
		officialViolationStatus: String
	}
	
	type EvaluationDates {
		inspectionDate: String
		approvedDate: String
		originalCertifyByDate: String
		originalCorrectByData: String
		certifyByDate: String
		correctByDate: String
		certifiedDate: String
	}

	type Complaint {
		complaintId: String
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
