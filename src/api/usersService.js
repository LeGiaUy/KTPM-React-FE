// Service layer cho người dùng (admin + user profile)
// Hiện tại dùng mockUsers, sau này thay bằng API backend thật.
import {
  getUsersApi,
  getUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "./mockUsers.js";

export async function getUsers() {
  // TODO: thay bằng fetch("/api/users")
  return getUsersApi();
}

export async function getUser(id) {
  // TODO: thay bằng fetch(`/api/users/${id}`)
  return getUserApi(id);
}

export async function createUser(payload) {
  // TODO: POST /api/users
  return createUserApi(payload);
}

export async function updateUser(id, changes) {
  // TODO: PATCH /api/users/:id
  return updateUserApi(id, changes);
}

export async function deleteUser(id) {
  // TODO: DELETE /api/users/:id
  return deleteUserApi(id);
}


