const { AuthenticationError } = require("apollo-server-express");
const { User, bookSchema } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ username: context.user.username });
      }
      throw new AuthenticationError("You need to be logged in!");
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
    // Allow delete only to logged in users
    removeBook: async (parent, { bookId }, context) => {
      // If user key is not found in context return authentication error
      if (context.user) {
        try {
          return await User.findOneAndUpdate(
            { username: context.user.username },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
        } catch (err) {
          console.log("remove book error");
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    saveBook: async (parent, args, context) => {
      // If user key is not found in context return authentication error
      if (context.user) {
        await User.findOneAndUpdate(
          { username: context.user.username },
          { $addToSet: { savedBooks: { ...args } } },
          { new: true }
        );
      }
    },
  },
};

module.exports = resolvers;
