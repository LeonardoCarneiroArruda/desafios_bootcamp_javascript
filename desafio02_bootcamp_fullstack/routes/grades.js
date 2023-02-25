import express from 'express'
import {promises} from 'fs';

const router = express.Router();

router.post("/", async (request, response) => {
    try {   
        const data = await promises.readFile("grades.json", "utf8");
        let json = JSON.parse(data);
        let grade = {id: json.nextId, timestamp: new Date(), ...request.body};
        json.nextId++;
        json.grades.push(grade);

        await promises.writeFile("grades.json", JSON.stringify(json));

        response.send(grade);
    } catch (err) {
       respostaErro400(response, err);     
    }
});

router.put("/:id", async (request, response) => {
    try {
        const data = await promises.readFile("grades.json", "utf8");
        let json = JSON.parse(data);
        let id = request.params.id;

        let index = json.grades.findIndex(g => {
            return g.id === parseInt(id, 10);
        });

        if (index >= 0) {
            let newGrade = {id: id, ...request.body};
            json.grades[index] = newGrade;

            await promises.writeFile("grades.json", JSON.stringify(json));
        }
        else {
            throw new Error("grades nao encontrado");
        }

        response.end();
    }
    catch(err) {
        respostaErro400(response, err);
    }
});

router.delete("/:id", async (request, response) => {
    try {
        const data = await promises.readFile("grades.json", "utf8");
        let json = JSON.parse(data);
        let id = request.params.id;

        json.grades = json.grades.filter(grade => {
            return grade.id != id;
        });

        await promises.writeFile("grades.json", JSON.stringify(json));
        response.end();
    }
    catch(err) {
        respostaErro400(response, err);
    }
});


router.get("/consulta-total-nota-disciplina", async (request, response) => {
    try {
        const data = await promises.readFile("grades.json", "utf8");
        let json = JSON.parse(data);
        let parametro = request.body;
        let value = json.grades.filter(g => {
            return g.subject === parametro.subject 
            && g.student === parametro.student;
        }).reduce((accumulator, current) => {
            return accumulator + current.value;
        }, 0);

        response.send({soma: value});
    }
    catch(err) {
        respostaErro400(response, err);
    }
});


router.get("/consulta-media-subject-type", async (request, response) => {
    try {
        const data = await promises.readFile("grades.json", "utf8");
        let json = JSON.parse(data);
        let parametro = request.body;
        let dados = json.grades.filter(g => {
            return g.subject === parametro.subject 
            && g.type === parametro.type;
        });

        let media = dados.reduce((accumulator, current) => {
            return accumulator + current.value;
        }, 0);

        media = media / dados.length;

        response.send({media: media});
    }
    catch(err) {
        respostaErro400(response, err);
    }
});


router.get("/consulta-melhores-grades", async (request, response) => {
    try {
        const data = await promises.readFile("grades.json", "utf8");
        let json = JSON.parse(data);
        let parametro = request.body;
        let dados = json.grades.filter(g => {
            return g.subject === parametro.subject 
            && g.type === parametro.type;
        }).sort((grade1, grade2) => {
            return grade2.value - grade1.value;
        });

        let array = [];
        for(const item of dados) {
            if (array.length < 3)
                array.push(item);
        }

        response.send(array);
    }
    catch(err) {
        respostaErro400(response, err);
    }
});


router.get("/:id", async (request, response) => {
    try {
        const data = await promises.readFile("grades.json", "utf8");
        let json = JSON.parse(data);
        let id = request.params.id;
        const grade = json.grades.find(item => {
            return item.id === parseInt(id, 10);
        });

        response.send(grade);
        
    }
    catch (err) {
        respostaErro400(response, err);
    }
});


function respostaErro400(response, err) {
    response.status(400).send({erro: err.message});
    console.log(err);
}

export default router;