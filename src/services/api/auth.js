import api from "./client";

export const registerUser = (userData) => {
  return api.post("/register", userData);
};

export const loginUser = (credentials) => {
  return api.post("/user/login", credentials);
};