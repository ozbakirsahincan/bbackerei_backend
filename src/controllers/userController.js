// src/controllers/userController.js
import { pool } from '../config/database.js';
import { hash } from 'bcrypt-ts';

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT id, username, role, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `);
    res.status(200).json({ success: true, data: rows, count: rows.length });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Kullanıcılar getirilirken hata oluştu', error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashed = await hash(password, 10);
    const [result] = await pool.execute(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
      [username, hashed, role]
    );
    res.status(201).json({ success: true, message: 'Kullanıcı oluşturuldu', userId: result.insertId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Kullanıcı oluşturulurken hata oluştu', error: error.message });
  }
};