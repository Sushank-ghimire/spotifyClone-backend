import { Songs } from "../models/Songs.models.js";

const getSongs = async (req, res, next) => {
  try {
    const songs = await Songs.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Songs received", songs, success: true });
  } catch (error) {
    next(error);
  }
};

const getSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const song = await Songs.findById(songId);

    if (!song) {
      return res
        .status(400)
        .json({ message: "Song not founded", success: false });
    }
    return res
      .status(200)
      .json({ message: "Song received", song, success: true });
  } catch (error) {
    next(error);
  }
};

const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Songs.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          imageUrl: 1,
          audioUrl: 1,
          artist: 1,
        },
      },
    ]);
    return res.status(200).json({ songs: songs, success: true });
  } catch (error) {
    next(error);
  }
};

const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Songs.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          imageUrl: 1,
          audioUrl: 1,
          artist: 1,
        },
      },
    ]);
    return res.status(200).json({ songs: songs, success: true });
  } catch (error) {
    next(error);
  }
};

const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Songs.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          imageUrl: 1,
          audioUrl: 1,
          artist: 1,
        },
      },
    ]);
    return res.status(200).json({ songs: songs, success: true });
  } catch (error) {
    next(error);
  }
};

export {
  getSong,
  getSongs,
  getTrendingSongs,
  getFeaturedSongs,
  getMadeForYouSongs,
};
