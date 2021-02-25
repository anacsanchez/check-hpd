const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { HousingViolationsAPI, BuildingsAPI, ComplaintsProblemsAPI, HousingComplaintsAPI } = require('./datasources');
const resolvers = require('./resolvers');

const server = () => {
	const dataSources = () => ({
		BuildingsAPI: new BuildingsAPI(),
		HousingViolationsAPI: new HousingViolationsAPI(),
		HousingComplaintsAPI: new HousingComplaintsAPI(),
		ComplaintsProblemsAPI: new ComplaintsProblemsAPI(),
	});

	return new ApolloServer({
		typeDefs,
		dataSources,
		resolvers
	});
};

module.exports = server;
