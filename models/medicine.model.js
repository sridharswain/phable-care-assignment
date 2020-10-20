"use strict"
const Sequelize = require('sequelize');

/**
 * model to keep medicine info
 * @param sequelize -> instance of sequelize
 * @returns {*|ModelCtor<Model>|void}
 */
module.exports = (sequelize) => {
    return sequelize.define("medicine", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        name: {
            field: "name",
            type: Sequelize.STRING
        },
        status: {
            field: "status",
            type: Sequelize.INTEGER
        }
    });
}