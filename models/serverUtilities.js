import { Schema } from 'mongoose';

const messageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});  

export const channelSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'voice'],
      default: 'text',
    },
    messages: [messageSchema],
  });

 export const groupSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    channels: [channelSchema],
  });


  
  export const chatSchema = new Schema({
    with: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    messages: [messageSchema],
  });