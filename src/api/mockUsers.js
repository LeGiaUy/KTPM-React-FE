// Mock API CRUD người dùng cho admin / profile
// Lưu dữ liệu trong sessionStorage để mô phỏng backend user service

const STORAGE_KEY = "ktpm_users";

const DEFAULT_USERS = [
  {
    id: 1,
    username: "student01",
    email: "student01@example.com",
    role: "student",
    address: "KTX Khu A, ĐHQG",
  },
  {
    id: 2,
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    address: "Phòng bộ môn KTPM",
  },
];

function readUsers() {
  if (typeof sessionStorage === "undefined") return [...DEFAULT_USERS];
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    return [...DEFAULT_USERS];
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [...DEFAULT_USERS];
  }
}

function writeUsers(users) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUsersApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ users: readUsers() });
    }, 200);
  });
}

export function getUserApi(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = readUsers();
      const user = users.find((u) => u.id === id);
      if (!user) {
        reject(new Error("User not found"));
      } else {
        resolve({ user });
      }
    }, 200);
  });
}

export function createUserApi(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = readUsers();
      const nextId =
        users.length > 0 ? Math.max(...users.map((u) => u.id || 0)) + 1 : 1;

      const newUser = {
        id: nextId,
        role: "student",
        address: "",
        ...payload,
      };

      const next = [...users, newUser];
      writeUsers(next);
      resolve({ user: newUser, users: next });
    }, 300);
  });
}

export function updateUserApi(id, changes) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = readUsers();
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) {
        reject(new Error("User not found"));
        return;
      }

      const updated = {
        ...users[index],
        ...changes,
      };

      const next = [...users];
      next[index] = updated;
      writeUsers(next);
      resolve({ user: updated, users: next });
    }, 300);
  });
}

export function deleteUserApi(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = readUsers();
      const next = users.filter((u) => u.id !== id);
      writeUsers(next);
      resolve({ users: next });
    }, 250);
  });
}


