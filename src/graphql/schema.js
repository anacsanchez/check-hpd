const gql = require('graphql-tag');

const typeDefs = gql`

	type Query {
		address(address: AddressInput): [HPDResult]
		getViolations(address: AddressInput): [Violation]
	}

	type HPDResult {
		results: [Building]
	}

	type Building {
		address: Address
		violations: [Violation]
		complaints: [Complaint]
	}

	type Violation {
		violationId: String
	}

	type Complaint {
		complaintId: String
	}

	type Address {
		houseNumber: String!
		streetName: String!
		borough: String
		zipCode: Int!
		apartment: String
		story: String
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
