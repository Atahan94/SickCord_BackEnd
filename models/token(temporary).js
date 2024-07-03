import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
});



const Token = model('Tokens', tokenSchema);

export default Token;

