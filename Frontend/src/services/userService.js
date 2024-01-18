import axios from "axios";

const baseUrl = "/users";

async function register(credentials) {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

async function login(credentials) {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
}

async function getUsers() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function deleteUser(id) {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
}

async function updateUserName(id, editName) {
  const res = await axios.put(`${baseUrl}/${id}`, editName);
  return res;
}


export default {
  register,
  login,
  getUsers,
  deleteUser,
  updateUserName,
};
