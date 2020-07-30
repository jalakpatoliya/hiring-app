const router = require('express').Router();
const bodyParser = require('body-parser');
const Company = require('../../models/Company');
const companyCtrl = require('./CompanyController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * Create Company
 */
router.post('/create', async (req, res) => {
  try {
    const { _id: userID } = req.user;

    // create Company
    const data = await companyCtrl.createCompany({ body: req.body, creator: userID });

    return res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
});

module.exports = router;
