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


