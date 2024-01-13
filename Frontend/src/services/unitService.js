import axios from "axios";

const baseUrl = "/unit";
let token = null;

function setToken(newToken) {
 token = `Bearer ${newToken}`;
}

async function getUnits() {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
}

async function createUnit(newAddUnit) {
  const config = {
    headers: { Authorization: token },
  };

  console.log("Config ni addUnit:", config);

  const res = await axios.post(baseUrl, newAddUnit, config);
  return res.data;

}

async function deleteUnit(id) {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
}

async function editUnit(id, editUnitData) {
  const config = {
    headers: { Authorization: token },
  };
  
    const response = await axios.put(`${baseUrl}/${id}`, editUnitData, config);
    return response.data; // Assuming the server returns the updated category data
  }


export default {
  setToken,
  getUnits,
  createUnit,
  deleteUnit,
  editUnit,
};
