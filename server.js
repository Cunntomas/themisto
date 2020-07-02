'use strict';
require('dotenv').config();
const logger = require('./lib/logger');
const app = require('./app');
const PORT = process.env.PORT || 8000;

const application = app.initialize();
application.listen(PORT);
logger.info(`Your server is listening on port ${PORT}`);
