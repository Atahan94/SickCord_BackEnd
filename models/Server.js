import { Schema, model } from "mongoose";
import { channelSchema, groupSchema } from "./serverUtilities";

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
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  channels: [channelSchema],
  groups: [groupSchema],
  image: {
    data: Buffer,
    contentType: String,
  },
});

const Server = model("Servers", serverSchema);

export default Server;
