// src/controllers/users/userController.js
import {
  getUsers,
  getUser,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
} from "../../services/users/userService.js";

export async function getAllUsers(req, res) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Kullanıcılar alınamadı" });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await getUser(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Kullanıcı alınamadı" });
  }
}

export async function createUser(req, res) {
  try {
    const { username, password, role } = req.body;
    await createNewUser({ username, password, role });
    res.status(201).json({ message: "Kullanıcı eklendi" });
  } catch (err) {
    console.error("🔴 Kullanıcı oluşturma hatası:", err);
    res.status(500).json({ error: err.message || "Kullanıcı eklenemedi" });
  }
}

export async function updateUser(req, res) {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    await updateExistingUser(id, data);
    res.json({ message: "Kullanıcı güncellendi" });
  } catch (err) {
    res.status(500).json({ error: "Kullanıcı güncellenemedi" });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = Number(req.params.id);
    await deleteExistingUser(id);
    res.json({ message: "Kullanıcı silindi" });
  } catch (err) {
    res.status(500).json({ error: "Kullanıcı silinemedi" });
  }
}
export async function getRoles(req, res) {
  try {
    res.json([
      { value: "admin", label: "Admin" },
      { value: "supervisor", label: "Süpervizör" },
      { value: "clerk", label: "Personel" },
      { value: "test", label: "test label" },
    ]);
  } catch (err) {
    res.status(500).json({ error: "Roller alınamadı" });
  }
}
