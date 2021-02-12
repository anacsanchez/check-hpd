const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { ViolationsAPI } = require('./datasources');
const resolvers = require('./resolvers');

const server = () => {

	const dataSources = () => ({
		ViolationsAPI: new ViolationsAPI()
	});

	return new ApolloServer({
		typeDefs,
		dataSources,
		resolvers,
	});

};

module.exports = server;
