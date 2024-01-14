import axios from "axios";

const baseUrl = "/product";
let token = null;

function setToken(newToken) {
 token = `Bearer ${newToken}`;
}

async function getProducts() {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
}

async function createProduct(newAddProduct) {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newAddProduct, config);
  return res.data;

}

async function deleteProduct(id) {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
}

async function editProduct(id, editUnitData) {
  const config = {
    headers: { Authorization: token },
  };
  
    const response = await axios.put(`${baseUrl}/${id}`, editUnitData, config);
    return response.data;
  }


export default {
  setToken,
  getProducts,
  createProduct,
  deleteProduct,
  editProduct,
};
