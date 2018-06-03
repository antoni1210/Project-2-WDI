const express            = require("express");
const router             = express.Router();
const static             = require('../controllers/static');
const registrations      = require('../controllers/registrations');
const sessions           = require('../controllers/sessions');
const recordsController  = require('../controllers/records');

router.get('/',(req, res) => res.render('home', {
  isHomepage: true
}));

router.route('/records')
  .get(recordsController.index)
  .post(recordsController.create);

router.route('/records/new')
  .get(recordsController.new);

router.route('/records/:id')
  .get(recordsController.show)
  .put(recordsController.update)
  .delete(recordsController.delete);

router.route('/records/:id/edit')
  .get(recordsController.edit);

module.exports = router;
