'use strict';
require('dotenv').config();
const logger = require('./lib/logger');
const app = require('./app');
const PORT = process.env.SERVER_PORT;

const application = app.initialize();
application.listen(process.env.SERVER_PORT);
logger.info(`Your server is listening on port ${process.env.SERVER_PORT}`);
