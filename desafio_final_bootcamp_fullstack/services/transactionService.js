const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const getAllPeriod = async (period) => {
    const transactions = await TransactionModel.find({"yearMonth": period}).sort({day: 1});

    return transactions;
}

const getForId = async (id) => {
    const transaction = await TransactionModel.findOne({"_id": id});
    return transaction;
}

const create = async (obj) => {
    const transaction = new TransactionModel(obj);
    await transaction.save();

    return transaction;
}

const update = async (id, obj) => {
    const transaction = await TransactionModel.findOneAndUpdate({"_id": id},
                                                          obj,
                                                          {new: true});
    return transaction;                                                          
}

const remove = async (id) => {
    const transaction = await TransactionModel.findOneAndDelete({"_id": id});

    return transaction;
}

const todosPeriodos = async () => {
    const periodos = await TransactionModel.find().distinct('yearMonth');
    return periodos;
}

module.exports = {getAllPeriod, create, update, getForId, remove, todosPeriodos}


