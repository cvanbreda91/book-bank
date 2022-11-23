const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        user: async (parent, { username, _id }) => {
            return User.findOne({ username, _id })
                .select('-__v -password')
        },
        book: async (parent, { savedBooks: bookId }) => {
            return User.findOne({ savedBooks: bookId });

        },
    },

    Mutation: {
        //create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            if (!user) {
                throw new error('Something is wrong!');
            }

            return { token, user };
        },

        //login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
        login: async (parent, { email: user, password }) => {
            const user = await User.findOne({ email: user });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        //save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.savedBooks.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: User.savedBooks.bookId } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        //remove a book from `savedBooks`
        deleteBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.savedBooks.delete({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: User.savedBooks.bookId } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

    },
}



module.exports = resolvers;