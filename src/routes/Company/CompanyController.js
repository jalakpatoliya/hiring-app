const Company = require('../../models/Company');
const User = require('../../models/User');

/**
 * Create a Company
 */
exports.createCompany = async ({ body, creator }) => {
  try {
    const companyData = await Company.create({ ...body, creator });

    const userData = await User.findByIdAndUpdate(
      creator,
      { company: companyData._id },
      { new: true }
    );
    return userData;
  } catch (error) {
    throw new Error(error);
  }
};
