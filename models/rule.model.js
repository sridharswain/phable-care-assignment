"use strict"
const Sequelize = require('sequelize')

const RuleStatus = require('../constants/RuleStatus');

/**
 * model to keep rules info
 * @param sequelize -> instance of sequelize
 * @returns {*|ModelCtor<Model>|void}
 */
module.exports = (sequelize) => {
    return sequelize.define("rule", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        medicineId: {
            field: "medicine_id",
            type: Sequelize.INTEGER
        },
        vendorId: {
            field: "vendor_id",
            type: Sequelize.INTEGER
        },
        startDate: {
            field: "start_date",
            type: Sequelize.DATE
        },
        endDate: {
            field: "end_date",
            type: Sequelize.DATE
        },
        unitPrice: {
            field: "unit_price",
            type: Sequelize.DECIMAL(10,2)
        },
        ruleStatus: {
            field: "rule_status",
            type: Sequelize.INTEGER,
            default: RuleStatus.FUTURE
        }
    }, {
        indexes: [
            {
                unique: false,
                fields: ['rule_status'] // Should only be in read only data source i.e slave DB
            },
            {
                unique: false,
                fields: ['medicine_id']
            },
            {
                unique: true,
                fields: ["medicine_id", "vendor_id"]
            }
        ]
    })
}