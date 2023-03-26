import { Schema, model, models } from "mongoose";

const chatSchema = new Schema(
  {
    room: String,
    userName: String,
    message: String,
    time: String | Number | Date,
  },
  {
    timestamps: true,
  }
);

const Chat = models.Chat || model("Chat", chatSchema);

export default Chat;
