"use strict"
const LOCAL_ENV = require('./local.env');
const STAGING_ENV = require('./staging.env');

const ENV_TO_APPLY = process.env.ENV || "local";

function applyEnv() {
    switch (ENV_TO_APPLY) {
        case "local":
            return LOCAL_ENV;
        case "staging":
            return STAGING_ENV;
    }
}

module.exports = applyEnv();