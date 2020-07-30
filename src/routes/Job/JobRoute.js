const router = require('express').Router();
const bodyParser = require('body-parser');
const jobCtrl = require('./JobController');
const { permit } = require('../../middlewares/permission');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * Create Job
 */
router.post('/create', permit('employer'), async (req, res) => {
  try {
    const { _id: userId } = req.user;

    // create Job
    const data = await jobCtrl.createJob({ body: req.body, userId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Get Job list
 */
router.get('/list', permit('candidate'), async (req, res) => {
  try {
    const { _id: userId } = req.user;

    // get Job List
    const data = await jobCtrl.getJobList({ userId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Apply to a Job
 */
router.post('/apply', permit('candidate'), async (req, res) => {
  try {
    const { jobId } = req.body;
    const { _id: userId } = req.user;
    // get Job List
    const data = await jobCtrl.applyToJob({ jobId, userId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Reject a Job
 */
router.post('/reject', permit('candidate'), async (req, res) => {
  try {
    const { jobId } = req.body;
    const { _id: userId } = req.user;

    // reject a job
    const data = await jobCtrl.rejectAJob({ jobId, userId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

/**
 * Reject a Job
 */
router.post('/reject/remove', permit('candidate'), async (req, res) => {
  try {
    const { jobId } = req.body;
    const { _id: userId } = req.user;

    // reject a job
    const data = await jobCtrl.removeJobFromRejectedList({ jobId, userId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});
module.exports = router;
