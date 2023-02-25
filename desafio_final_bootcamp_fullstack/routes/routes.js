const express = require('express');
const transactionRouter = express.Router();
const services = require('../services/transactionService.js');
const { response } = require('express');

transactionRouter.get("/", async (request, response) => {
    try {
        if (!request.query.period)
            throw new Error("É necessário informar o parametro period")

        const transactions = await services.getAllPeriod(request.query.period);

        response.send(transactions);
    }
    catch(error) {
        response.status(500).send({erro: error.message});
    }
});


transactionRouter.get("/todos-periodos", async (request, response) => {
    try {
        const periodos = await services.todosPeriodos();

        response.send(periodos);
    }
    catch (error) {

    }
});


transactionRouter.get("/:id", async (request, response) => {
    try {
        const transaction = await services.getForId(request.params.id);

        response.send(transaction);
    }
    catch(error) {
        response.status(500).send({erro: error.message});
    }
});

transactionRouter.post("/", async (request, response) => {
    try {
        const transaction = await services.create(request.body);

        response.send(transaction);
    }
    catch(error) {
        response.status(500).send({erro: error.message});
    }
});

transactionRouter.put("/:id", async (request, response) => {
    try {
        const transaction = await services.update(request.params.id, request.body);
        
        response.send(transaction);
    }
    catch(error) {
        response.status(500).send({erro: error.message});
    }
});

transactionRouter.delete("/:id", async (request, response) => {
    try {
        const transaction = await services.remove(request.params.id);

        response.send(transaction);
    }
    catch (error) {
        response.status(500).send({erro: error.message});
    }
});


module.exports = transactionRouter;
