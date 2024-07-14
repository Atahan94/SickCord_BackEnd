import { Schema, model } from 'mongoose';
import { invitationSchema } from './userUtilities';
import bcrypt from "bcrypt";


const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  lastLoggedIn: { type: Date, default: Date.now },
  servers: [{
    type: Schema.Types.ObjectId,
    ref: 'Servers', // Referans edilen şemanın adı
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Referans edilen şemanın adı
  }],
  invitations: [invitationSchema],
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.checkPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    if (match) {
      return Promise.resolve();
    }
    throw new Error("0");
  } catch (error) {
    return Promise.reject(error.message);
  }
};

userSchema.methods.updateLoggedIn = function () {
  return this.model("Users").findOneAndUpdate(
    {
      email: this.email,
    },
    { lastLoggedIn: new Date() }
  );
};


const User = model('Users', userSchema);

export default User;

