import Chat from "@/models/chatModel";
import connectMongo from "../utils/db";

export default async function handler(req, res) {
  await connectMongo();
  const newChat = await new Chat({
    room: req.body.room,
    userName: req.body.username,
    message: req.body.currentMessage,
    time: req.body.time,
  });
  await newChat.save();
  res.send(newChat);
}
