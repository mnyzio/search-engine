// const { resolvers } = require(".");
const { User, bookSchema } = require("../models");
// const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, { username }) => {
      return await User.findOne({ username: username });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Create the user
      //todo const user = await User.create({ username, email, passwrod });
      // Sign JSON Web Token
      //todo const token = signToken(user);
      // Return an 'Auth' object
      //todo return { token, user };
      //! testing
      return await User.create({ username, email, password });
    },
  },
};

module.exports = resolvers;

// Mutation: {},
