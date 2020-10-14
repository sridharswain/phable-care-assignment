const createError = require('http-errors');
const express = require('express');
const path = require('path');

const env = require('./env')

const statusRouter = require('./routes/status');
const ruleRouter = require('./routes/rule');
const medicineRouter = require('./routes/medicine');

/**
 * Initialise DB
 * @type {{sequelize}}
 */
const db = require('./models');
db.sequelize.sync({force: env.DB_CONFIG.FORCE_DDL});

/**
 * Connect to rabbitMQ and start consumers
 */
const queues = require('./queue');
queues.connect();

/**
 * Start Crons
 */
const cron = require('./cron');
cron.startCron();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', statusRouter);
app.use('/rule', ruleRouter);
app.use('/medicine', medicineRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send("Error");
});

module.exports = app;
