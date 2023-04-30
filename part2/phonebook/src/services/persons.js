import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const findByName = (name) => {
  const request = axios.get(`${baseUrl}?name=${name}`);
  return request.then((response) => response.data);
};

const create = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newObject, setMessage) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      setMessage(
        `The contact you are trying to change was already removed from the server`
      );
    });
};

export default {
  create,
  getAll,
  remove,
  update,
  findByName,
};
