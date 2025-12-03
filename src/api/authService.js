// Service layer cho auth: hiện tại dùng mock, sau này chỉ cần đổi sang gọi API backend
import { loginApi as loginMock, registerApi as registerMock } from "./mockAuth.js";

export async function login(payload) {
  // TODO: thay bằng fetch("/api/auth/login", { method: "POST", body: JSON.stringify(payload) })
  return loginMock(payload);
}

export async function register(payload) {
  // TODO: thay bằng fetch("/api/auth/register", { method: "POST", body: JSON.stringify(payload) })
  return registerMock(payload);
}


