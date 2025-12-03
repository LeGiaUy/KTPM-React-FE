// Mock API cho auth (đăng nhập / đăng ký)
// Trường: username, email, password, role, address

const USERS = [
  {
    id: 1,
    username: "student01",
    email: "student01@example.com",
    password: "123456", // chỉ để mock, không dùng thật
    role: "student",
    address: "KTX Khu A, ĐHQG",
  },
  {
    id: 2,
    username: "admin",
    email: "admin@example.com",
    password: "123456", // mock admin
    role: "admin",
    address: "Phòng bộ môn KTPM",
  },
];

export function loginApi({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS.find(
        (u) => u.email === email && u.password === password,
      );
      if (!user) {
        reject(new Error("Email hoặc mật khẩu không đúng"));
      } else {
        resolve({ user: { ...user, password: undefined } });
      }
    }, 500);
  });
}

export function registerApi(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = USERS.some(
        (u) => u.email === payload.email || u.username === payload.username,
      );
      if (exists) {
        reject(new Error("Tài khoản đã tồn tại"));
        return;
      }

      const newUser = {
        id: USERS.length + 1,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        role: payload.role || "student",
        address: payload.address || "",
      };
      USERS.push(newUser);
      resolve({ user: { ...newUser, password: undefined } });
    }, 500);
  });
}

// Đổi mật khẩu (mock) dựa trên email + mật khẩu cũ
export function changePasswordApi({ email, oldPassword, newPassword }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS.find(
        (u) => u.email === email && u.password === oldPassword,
      );
      if (!user) {
        reject(new Error("Mật khẩu hiện tại không đúng"));
        return;
      }
      user.password = newPassword;
      resolve({ success: true });
    }, 400);
  });
}


