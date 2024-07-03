import User from "../models/User";
import Token from "../models/token(temporary)";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export const createUser = async ({ name}) => {
    try {
      //console.log("EKOBEKO", images);
      await User.create({name});
      return Promise.resolve();
    } catch (error) {
      return Promise.reject({ error });
    }
  };

  const sign = (obj) =>
  new Promise((resolve, reject) => {
    jwt.sign(obj, process.env.JWT_SECRET, (error, token) => {
      if (error) return reject(error);

      return resolve(token);
    });
  });

  export const signUpUser = async ({ name, email, password }) => {
    try {
      console.log("controller", name, email, password)
      const user = await User.create({ name, email, password });
      
      return Promise.resolve({
        user: { id: user._id, name: user.name, lastLoggedIn: user.lastLoggedIn },

      });
    } catch (error) {
      return Promise.reject({ error });
    }
  };

  export const loginUser = async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      await user.checkPassword(password);
      await user.updateLoggedIn();
      const token = await sign({
        id: user._id,
        name: user.name,
        email: user.email,
      });
      console.log("USERR", user.name)
     await updateOrCreateToken(user.name, token);
      return Promise.resolve({
        user: { id: user._id, email: user.email , name: user.name, lastLoggedIn: user.lastLoggedIn },
        token,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  async function updateOrCreateToken(username, newToken) {
    try {
        // Token'ı arıyoruz
        const existingToken = await Token.findOne({ name: username });

        if (existingToken) {
            // Token mevcutsa, güncelliyoruz
            existingToken.token = newToken;
            await existingToken.save();
        } else {
            // Token yoksa, yeni bir kayıt oluşturuyoruz
           await Token.create({ name: username, token: newToken });
        }

        console.log('Token işlem tamamlandı');
    } catch (error) {
        console.error('Token işlemi sırasında hata:', error);
    }
}

export const getToken = async (name) => {
  try {
    const existingToken = await Token.findOne({ name: name });

    return existingToken.token;
  } catch (error) {
    console.log("Error occured during acessing the token");
  }
}

  export const updateUser = async (props, key) => {
    try {
      console.log(props)
      await User.findByIdAndUpdate(
        key, // id of the User to update
        { $push: { servers: props.server } }, // push the new server id to the servers array
        { new: true } // return the updated document
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject({ error });
    }
  }
  export const deleteUserServer = async ({serverId}) => {
    try {
      console.log(serverId)
      await User.updateMany(
        { servers: serverId },
        { $pull: { servers: serverId } }
      );
      return Promise.resolve("succesfully deleted the server on users");
    } catch (error) {
      return Promise.reject({ error });
    }
  }

  export const getUser = (name) =>
  User.findOne({name});
