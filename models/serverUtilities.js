import { Schema } from 'mongoose';

  
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
  });

 export const groupSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    channels: [channelSchema],
  });
  

  /* const messageSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    }
  });
   */