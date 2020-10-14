"use strict"
/**
 * Local environment data
 */
module.exports = {
    DB_CONFIG: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "root",
        DB: "phable",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        FORCE_DDL: false
    },
    RABBIT_MQ: {
        HOST: "172.16.0.16",
        USER: "admin",
        PASSWORD: "kar.95424",
        PORT: 5672
    }
}