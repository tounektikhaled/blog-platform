const { mergeResolvers } = require('@graphql-tools/merge');
const postResolvers = require('./postResolvers');
const userResolvers = require('./userResolvers');

const resolvers = mergeResolvers([postResolvers, userResolvers]);

module.exports = resolvers;
