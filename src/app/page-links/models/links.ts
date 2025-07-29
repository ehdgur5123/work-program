import { Schema, model, models } from "mongoose";

const LinksSchema = new Schema(
  {
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String },
    logo: { type: String },
    category: {
      large: { type: String, required: true },
      medium: { type: String, required: true },
      small: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    collection: "links",
  }
);

export const LinksModel = models.Links || model("Links", LinksSchema);
