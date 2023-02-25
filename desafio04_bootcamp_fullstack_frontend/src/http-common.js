import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: 'https://intense-mesa-35102.herokuapp.com', //'http://localhost:3002'
  headers: {
    'Content-type': 'application/json',
  },
});
