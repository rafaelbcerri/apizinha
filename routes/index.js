const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


router.get("/", function(req, resp) {
  resp.send("Hello");
});

router.get("/unauthorized", function(req, resp) {
  resp.sendStatus(401);
});

router.get("/conflict", function(req, resp) {
  resp.sendStatus(409);
});

router.use(require('../controllers/users'));
router.use(require('../controllers/artists'));
router.use(require('../controllers/tracks'));

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;