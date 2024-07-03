import { Schema, model } from 'mongoose';



const serverSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'Users',
    }],
  });

const Server = model('Servers', serverSchema);

export default Server;

