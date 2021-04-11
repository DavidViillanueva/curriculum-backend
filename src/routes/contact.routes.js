const route = require('express');
const routerMethod = route.Router();

const { validateJWT } = require('../middlewares/validate.middlewares');
const { sendEmail } = require('../controllers/contact.controller');

routerMethod.post('/sendEmail',validateJWT, sendEmail );


module.exports = routerMethod;