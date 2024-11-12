import { Songs } from "../models/Songs.models.js";
import { Album } from "../models/Album.models.js";
import { uploadToCloudinary } from "../lib/CloudinaryUpload.js";

const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: "You can only upload audiofiles and imagefiles",
      });
    }

    const { title, artist, albumId, duration } = req.body;

    const allFields = [title, artist, albumId, duration];

    if (allFields.some((field) => !field || field === "")) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const audioFile = req.files?.audioFile;
    const imageFile = req.files?.imageFile;

    const imageUrl = await uploadToCloudinary(imageFile);
    const audioUrl = await uploadToCloudinary(audioFile);

    const song = new Songs.create({
      title,
      artist,
      albumId: albumId || null,
      duration,
      imageUrl,
      audioUrl,
    });
    if (!song) {
      return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    return res
      .status(201)
      .json({ message: "Song added successfully", success: true });
  } catch (error) {
    next(error);
  }
};

const deleteSongs = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await Songs.findById(songId);
    if (!song) {
      return res
        .status(400)
        .json({ success: false, message: "Song not founded." });
    }
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song_id },
      });
    }
    const deleted = await Songs.findByIdAndDelete(songId);

    if (!deleted) {
      return res
        .status(200)
        .json({ success: false, message: "Failed to delete the song" });
    }
    return res
      .status(200)
      .json({ success: false, message: "Song deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releasedYear } = req.body;

    const fields = [title, artist, releasedYear];

    if (fields.some((field) => !field || field === "")) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const imageFile = req.files?.imageFile;

    if (!imageFile)
      return res
        .status(400)
        .json({ success: false, message: "Image must be required" });

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = await Album.create({
      title,
      artist,
      imageUrl,
      releasedYear,
    });

    if (!album) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Album created successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    await Songs.deleteMany({ albumId: albumId });

    const album = await Album.findByIdAndDelete(albumId);

    if (!album) {
      return res
        .status(500)
        .json({ success: false, message: "Album not founded" });
    }
    await album.save();
    return res
      .status(200)
      .json({ success: true, message: "Album deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { createSong, createAlbum, deleteAlbum, deleteSongs };
