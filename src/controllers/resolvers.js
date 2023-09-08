import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers = {
  Mutation: {
    signUp: async (_, { name, email, password }) => {
      //check if user already registered
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("This email is already in use");
      }

      //hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 12);

      //save new user in the database
      const newUser = await new Users({
        name,
        email,
        password: hashedPassword,
      }).save();
      return newUser;
    },

    login: async (_, { email, password }) => {
      // check if there is user in our db
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      //Checking if password match
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Invalid email or password");
      }

      //generating jwt token using user id
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      return { token };
    },
  },
};

export default resolvers
