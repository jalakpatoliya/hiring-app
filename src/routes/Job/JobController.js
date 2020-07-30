const Job = require('../../models/Job');
const User = require('../../models/User');
const Company = require('../../models/Company');
const Profile = require('../../models/Profile');
const mongoose = require('mongoose');

/**
 * Create a Job
 */
exports.createJob = async ({ body, userId }) => {
  try {
    // Get companyId
    const { company } = await User.findById(userId);
    // create job
    const { _id: jobId } = await Job.create({ ...body, company });
    // attach job to company
    const companyData = await Company.findByIdAndUpdate(
      company,
      { $push: { jobs: jobId } },
      { new: true }
    );

    return companyData;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Get Job List
 */
exports.getJobList = async ({ userId }) => {
  try {
    // get all applied and rejected jobs
    const [{ ids }] = await Profile.aggregate()
      .match({
        user: mongoose.Types.ObjectId(userId),
      })
      .project({ ids: { $concatArrays: ['$applied.job', '$rejected.job'] } });

    // Get Jobs not rejected and applied by user
    // const jobListData = await Job.find().where('_id').nin(ids);
    const jobListData = await Job.find({
      _id: {
        $nin: ids,
      },
    })
      .populate('company', '-jobs -creator')
      .select('-applicants');

    return jobListData;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Apply to a Job
 */
exports.applyToJob = async ({ jobId, userId }) => {
  try {
    // Apply to a Job, adding only if it doesnt exist
    const jobData = await Job.findOneAndUpdate(
      { _id: jobId, 'applicants.user': { $ne: userId } },
      { $push: { applicants: { user: userId } } },
      { new: true }
    );

    // Add job to profile of user
    const profileData = await Profile.findOneAndUpdate(
      { user: userId, 'applied.job': { $ne: jobId } },
      { $push: { applied: { job: jobId } } },
      { new: true }
    );

    return jobData;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Reject a Job
 */
exports.rejectAJob = async ({ jobId, userId }) => {
  try {
    // Reject a Job
    const profileData = await Profile.findOneAndUpdate(
      { user: userId, 'rejected.job': { $ne: jobId } },
      { $push: { rejected: { job: jobId } } },
      { new: true }
    );

    return profileData;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Remove a Job from Rejected list
 */
exports.removeJobFromRejectedList = async ({ jobId, userId }) => {
  try {
    // Apply to a Job, adding only if it doesnt exist
    const profileData = await Profile.findOneAndUpdate(
      { user: userId },
      { $pull: { rejected: { job: mongoose.Types.ObjectId(jobId) } } },
      { new: true }
    );

    return profileData;
  } catch (error) {
    throw new Error(error);
  }
};
