const STORAGE_KEY = "talha_users";

export interface User {
  username: string;
  password: string;
}

export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

export function saveUser(user: User): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function findUser(username: string, password: string): boolean {
  const users = getUsers();
  return users.some(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
}

export function userExists(username: string): boolean {
  const users = getUsers();
  return users.some((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function isLoggedIn(): boolean {
  return sessionStorage.getItem("talha_session") === "1";
}

export function setLoggedIn(): void {
  sessionStorage.setItem("talha_session", "1");
}

export function logout(): void {
  sessionStorage.removeItem("talha_session");
}
