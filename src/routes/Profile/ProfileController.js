const User = require('../../models/User');
const Profile = require('../../models/Profile');

/**
 * Create a Profile
 */
exports.createProfile = async ({ body, userId }) => {
  try {
    // find or create not update
    const profileData = await Profile.findOneAndUpdate(
      { user: userId },
      {
        $setOnInsert: { ...body },
      },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(userId, { profile: profileData._id });

    return profileData;
  } catch (error) {
    throw new Error(error);
  }
};
