import axios from "axios";

const baseUrl = "/profile";
let token = null;

function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

async function getProfiles() {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
}

async function createProfile(newProfile) {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newProfile, config);
  return response.data;
}

async function deleteProfile(id) {
  const config = {
    headers: { Authorization: token },
  };
  console.log("Delete in profileService ID:", id);

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
}

async function editProfile(id, editUnitData) {
    const config = {
      headers: { Authorization: token },
    };
    
      const response = await axios.put(`${baseUrl}/${id}`, editUnitData, config);
      return response.data;
    }

export default {
  setToken,
  getProfiles,
  createProfile,
  deleteProfile,
  editProfile,
};
