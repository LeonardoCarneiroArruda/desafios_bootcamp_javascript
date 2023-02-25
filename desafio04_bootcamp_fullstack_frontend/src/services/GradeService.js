import http from '../http-common';

const getAll = () => {
  return http.get('/grade');
};

const get = (id) => {
  return http.get(`/grade/buscar/${id}`);
};

const create = (data) => {
  return http.post('/grade', data);
};

const update = (id, data) => {
  return http.put(`/grade/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/grade/${id}`);
};

const removeAll = () => {
  return http.delete(`/grade`);
};

const findByName = (name) => {
  if(name === '')
    name = 'TODOS';
  
  return http.get(`/grade/pesquisa-nome/${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
