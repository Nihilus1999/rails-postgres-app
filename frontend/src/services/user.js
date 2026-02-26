// src/services/userService.js
import index from "@/configs/axios/index";

export const createUser = async (userPayload) => {
  const response = await index.post("users", userPayload);
  return {
    data: response.data,
    message: response.data?.message || "Usuario registrado correctamente",
  };
};

export const getUsers = async (params = {}) => {
  const response = await index.get("users", { params });
  return {
    data: response.data,
    message: response.data?.message || "Usuarios obtenidos correctamente",
  };
};

export const getUserById = async (id) => {
  const response = await index.get(`users/${id}`);
  return {
    data: response.data,
    message: response.data?.message || "Datos del usuario obtenidos correctamente",
  };
};

export const updateUser = async (id, updates) => {
  const response = await index.put(`users/${id}`, updates);
  return {
    data: response.data,
    message: response.data?.message || "Usuario actualizado correctamente",
  };
};

export const deleteUser = async (id) => {
  const response = await index.delete(`users/${id}`);
  return {
    message: response.data?.message || "Usuario eliminado correctamente",
  };
};