import School from "@/models/schoolModel";
import data from "../utils/data";
import connectMongo from "../utils/db";

export default async function handler(req, res) {
  await connectMongo();
  await School.deleteMany();
  await School.insertMany(data);
  res.send(data);
}
