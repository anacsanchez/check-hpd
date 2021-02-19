const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { HousingViolationsAPI, BuildingsAPI } = require('./datasources');
const resolvers = require('./resolvers');

const server = () => {
	const dataSources = () => ({
		HousingViolationsAPI: new HousingViolationsAPI(),
		BuildingsAPI: new BuildingsAPI()
	});

	return new ApolloServer({
		typeDefs,
		dataSources,
		resolvers
	});
};

module.exports = server;
