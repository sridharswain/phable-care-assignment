"use strict"
const env = require('../env');

const Sequelize = require('sequelize');

const Medicine = require('./medicine.model');
const Vendor = require('./vendor.model');
const Rule = require('./rule.model');

/**
 * Instantiate Sequelize and connect to DB with creating a pool of connection
 */
const sequelize = new Sequelize(env.DB_CONFIG.DB, env.DB_CONFIG.USER, env.DB_CONFIG.PASSWORD, {
    host: env.DB_CONFIG.HOST,
    dialect: env.DB_CONFIG.dialect,
    operatorsAliases: false,
    pool: {
        max: env.DB_CONFIG.pool.max,
        min: env.DB_CONFIG.pool.min,
        acquire: env.DB_CONFIG.pool.acquire,
        idle: env.DB_CONFIG.pool.idle
    }
})
const db = {sequelize: sequelize}

/**
 * Add models to db object to be available through out project
 */
db.medicine = Medicine(sequelize);
db.vendor = Vendor(sequelize);
db.rule = Rule(sequelize);

module.exports = db
