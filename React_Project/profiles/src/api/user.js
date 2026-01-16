import axios from "axios";

const API_URL = "http://localhost:4000/models";

// Get all models
export const getModels = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a model
export const addModel = async (modelData) => {
  const response = await axios.post(API_URL, modelData);
  return response.data;
};

// Delete a model
export const deleteModel = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
