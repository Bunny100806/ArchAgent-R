import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    email,
    password,
  });

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });

  return response.data;
};

export const generateArchitecture = async (
  projectTitle,
  projectDescription
) => {
  const response = await axios.post(`${API_BASE_URL}/generate`, {
    project_title: projectTitle,
    project_description: projectDescription,
  });

  return response.data;
};

export const getProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`);
  return response.data;
};

export const getProjectById = async (projectId) => {
  const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`);
  return response.data;
};

export const chatWithArchitecture = async (
  currentArchitecture,
  message
) => {
  const response = await axios.post(`${API_BASE_URL}/chat`, {
    current_architecture: currentArchitecture,
    message,
  });

  return response.data;
};