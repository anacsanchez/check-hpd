const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { ViolationsAPI, BuildingsAPI } = require('./datasources');
const resolvers = require('./resolvers');

const server = () => {
	const dataSources = () => ({
		ViolationsAPI: new ViolationsAPI(),
		BuildingsAPI: new BuildingsAPI()
	});

	return new ApolloServer({
		typeDefs,
		dataSources,
		resolvers
	});
};

module.exports = server;
