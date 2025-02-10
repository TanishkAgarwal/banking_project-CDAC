import httpClient from '../http-common';

const getAll = () => {
  return httpClient.get('');
};

const login = (data) => {
    return httpClient.post('/login',data);
};

const create = (data) => {
  return httpClient.post('', data);
};

const get = (id) => {
  return httpClient.get(`${id}`);
};

const update = (data) => {
  return httpClient.put('', data);
};

const remove = (id) => {
  return httpClient.delete(`/${id}`);
};
export default { getAll,login, create, get, update, remove };
