import mongoose, { Schema, models } from "mongoose";

const messageSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = models.Message || mongoose.model("Message", messageSchema);
export default Message;
