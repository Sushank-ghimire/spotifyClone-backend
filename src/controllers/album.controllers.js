import { Album } from "../models/Album.models.js";

const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    return res
      .status(200)
      .json({ message: "Albums founded", albums: albums, success: true });
  } catch (error) {
    next(error);
  }
};

const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId);
    if (!album) {
      return res
        .status(400)
        .json({ message: "Album not founded", success: false });
    }
    return res
      .status(200)
      .json({ message: "Album founded", album, success: true });
  } catch (error) {
    next(error);
  }
};

export { getAlbumById, getAllAlbums };
