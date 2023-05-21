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
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      //todo const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      //todo if (!user) {
      //todo   throw new AuthenticationError('No user found with this email address');
      //todo }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      //todo const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      //todo if (!correctPw) {
      //todo   throw new AuthenticationError('Incorrect credentials');
      //todo }

      // If email and password are correct, sign user into the application with a JWT
      //todo const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      //todo return { token, user };
      return await User.findOne({ email });
    },
  },
};

module.exports = resolvers;

// Mutation: {},
