import axios from "axios";

const baseUrl = "/category";
let token = null;

function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

async function getCategories() {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
}

async function createCategory(newCategory) {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newCategory, config);
  return response.data;
}

async function deleteCategory(id) {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
}

export default {
  setToken,
  getCategories,
  createCategory,
  deleteCategory,
};
