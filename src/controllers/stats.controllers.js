import { Album } from "../models/Album.models.js";
import { User } from "../models/Users.models.js";
import { Songs } from "../models/Songs.models.js";

const getTotalStats = async (req, res, next) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Songs.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        Songs.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    return res
      .status(200)
      .json({ totalAlbums, totalSongs, totalUsers, uniqueArtists });
  } catch (error) {
    next(error);
  }
};

export { getTotalStats };
