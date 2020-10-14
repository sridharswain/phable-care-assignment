"use strict"

module.exports = {
    DB_CONFIG: {
        HOST: "172.16.0.16",
        USER: "staginguser",
        PASSWORD: "stagingpassword",
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