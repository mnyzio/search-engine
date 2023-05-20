// const { resolvers } = require(".");
const { User, bookSchema } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, { username }) => {
      return await User.findOne({ username: username });
    },
  },
};

module.exports = resolvers;

// Mutation: {},
