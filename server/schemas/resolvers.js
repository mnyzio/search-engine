const { AuthenticationError } = require("apollo-server-express");
const { User, bookSchema } = require("../models");
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
      const user = await User.create({ username, email, password });
      // Sign JSON Web Token
      const token = signToken(user);
      // Return an 'Auth' object
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    // removeBook: async (parent, { bookId }, context) => {
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        await User.findByIdAndUpdate(
          { userame: context.user.username },
          { $pull: { saveBooks: bookId } }
        );
        const user = await User.findOne({});
      }
    },
    saveBook: async (
      parent,
      { authors, description, title, bookId, image, link },
      context
    ) => {},
  },
};

module.exports = resolvers;
