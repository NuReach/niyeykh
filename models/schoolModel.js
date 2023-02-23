import { Schema, model, models } from "mongoose";

const schoolSchema = new Schema({
  name: String,
  img: String,
});

const School = models.School || model("School", schoolSchema);

export default School;
