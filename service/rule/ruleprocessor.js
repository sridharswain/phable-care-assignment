"use strict"
const format = require('string-format');
format.extend(String.prototype);

const db = require('../../models');

const ruleutil = require('./ruleutil');

async function getOrCreateVendor(vendorName) {
    // TODO Apply lock for vendor name
    let vendor = await db.vendor.findOne({
        where: {
            name: vendorName,
            status: 1
        }
    });

    if (!vendor) {
        vendor = await db.vendor.create({name: vendorName, status: 1});
    }

    return vendor;
}

async function getOrCreateMedicine(medicineName) {
    // TODO Apply lock for medicine name
    let medicine = await db.medicine.findOne({
        where: {
            name: medicineName,
            status: 1
        }
    });

    if (!medicine) {
        medicine = await db.medicine.create({name: medicineName, status: 1});
    }

    return medicine;
}

async function getOrCreateRule(medicineId, vendorId, ruleToProcess) {
    // TODO Apply lock for rule medicineId and vendorId name
    let rule = await db.rule.findOne({
        where: {
            medicineId: medicineId,
            vendorId: vendorId
        }
    });

    let startDate = Date.parse(ruleToProcess.startDate);
    let endDate = Date.parse(ruleToProcess.endDate);

    if (!rule) {
        // Create New Rule
        rule = await db.rule.create({
            medicineId: medicineId,
            vendorId: vendorId,
            startDate: startDate,
            endDate: endDate,
            unitPrice: ruleToProcess.price,
            ruleStatus: ruleutil.ruleStatus(startDate, endDate)
        });
    } else {
        // Update Existing rule
        await rule.update({
            startDate: startDate,
            endDate: endDate,
            unitPrice: ruleToProcess.price,
            ruleStatus: ruleutil.ruleStatus(startDate, endDate)
        });
    }

    return rule;
}

exports.process = async (message, isSuccessful) => {
    let ruleToProcess = JSON.parse(message);
    try {
        let vendor = await getOrCreateVendor(ruleToProcess.vendorName);
        let medicine = await getOrCreateMedicine(ruleToProcess.medicineName);
        await getOrCreateRule(medicine.id, vendor.id, ruleToProcess);

        isSuccessful(true);
    } catch (exception) {
        console.log("Unable to updateRule. Data {0}".format(message));
        isSuccessful(false);
    }
}

exports.updateRule = async (message, isSuccessful) => {
    let ruleToProcess = JSON.parse(message);
    try {
        await getOrCreateRule(ruleToProcess.medicineId, ruleToProcess.vendorId, ruleToProcess);
        isSuccessful(true);
    } catch (exception) {
        console.log("Unable to updateRule. Data {0}".format(message));
        isSuccessful(false);
    }
}