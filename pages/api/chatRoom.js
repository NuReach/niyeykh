import Chat from "@/models/chatModel";
import connectMongo from "../utils/db";

export default async function handler(req, res) {
  await connectMongo();
  const chatRoom = await Chat.find({ room: req.body.room });
  if (chatRoom) {
    res.send(chatRoom);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
}
