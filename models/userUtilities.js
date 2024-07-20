import { Schema } from 'mongoose';

export const invitationSchema = new Schema({
    type: {
      type: String,
      enum: ['server', 'user'],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      required: true,
    }
  });