import express from 'express';
import routerGrades from './routes/grades.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use("/grades", routerGrades);

app.listen(port, () => {
    try {
        console.log(`API Started and listening in port ${port}`);
    }
    catch(err) {
        console.log(err);
    }
});

