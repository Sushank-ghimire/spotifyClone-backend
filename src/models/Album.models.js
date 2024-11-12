import { model, models, Schema } from "mongoose";

const albumSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    songs: {
      type: [{ type: Schema.Types.ObjectId, ref: "Songs" }],
    },
  },
  { timestamps: true }
);

export const Album = models("Album") || model("Album", albumSchema);
