import axios from 'axios';

//Define a URL base da origem para consumo do servico
const http = axios.create({
  baseURL: 'https://leonardocarneiro-desafio-final.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});

const getAll = async (period) => {
    return http.get(`/api/transaction?period=${period}`);
};  

const getById = async (id) => {
    return http.get(`/api/transaction/${id}`);
}

const create = async (data) => {
    return http.post('/api/transaction', data);
};
  
  const update = async (id, data) => {
    return http.put(`/api/transaction/${id}`, data);
  };
  
  const remove = async (id) => {
    return http.delete(`/api/transaction/${id}`);
  };
  
const todosPeriodos = async () => {
  return http.get(`/api/transaction/todos-periodos`);
}

  export default {
    getAll,
    create,
    update,
    remove,
    getById,
    todosPeriodos
  };
  
