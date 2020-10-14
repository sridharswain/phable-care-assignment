"use strict";
const db = require('../../models');

async function getMedicine(medicineId) {
    return db.medicine.findOne({
        where: {
            id: medicineId
        }
    });
}

async function getTariffsForMedicine(medicineId) {
    return db.rule.findAll({
        where: {
            medicineId: medicineId
        }
    });
}

async function getMedicineAndTariffInfo(medicineId) {
    let medicineInfo = await getMedicine(medicineId);
    if (medicineInfo) {
        let tariffInfo = await getTariffsForMedicine(medicineId);
        return new Promise((resolve, _) => resolve({
            medicine: medicineInfo,
            tariffs: tariffInfo
        }));
    } else {
        return new Promise((_, reject) => reject("Invalid Medicine Id"));
    }
}

exports.getTariffs = (medicineId) => {
    return getMedicineAndTariffInfo(medicineId);
}