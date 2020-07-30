const router = require('express').Router();
const bodyParser = require('body-parser');
const profileCtrl = require('./ProfileController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * Create Profile
 */
router.post('/create', async (req, res) => {
  try {
    const { _id: userId } = req.user;

    // create Profile
    const data = await profileCtrl.createProfile({ body: req.body, userId });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

module.exports = router;
