// src/services/users/userService.js
import { db } from '../../db/index.js';
import { users , roles } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';


export async function getUsers() {
  return await db.select().from(users);
}

export async function getUser(id) {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result[0] || null;
}

export async function createNewUser({ username, password, role }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Rol ID'sini al
  const roleResult = await db.select().from(roles).where(eq(roles.name, role)).limit(1);
  const roleRecord = roleResult[0];

  if (!roleRecord) {
    throw new Error(`Role '${role}' not found`);
  }

  await db.insert(users).values({
    username,
    password: hashedPassword,
    role_id: roleRecord.id, // kritik kısım bu
  });
}

export async function updateExistingUser(id, { username, password, role }) {
  const updateData = {};
  if (username) updateData.username = username;
  if (password) updateData.password = await bcrypt.hash(password, 10);
  if (role) updateData.role = role;

  await db.update(users).set(updateData).where(eq(users.id, id));
}

export async function deleteExistingUser(id) {
  await db.delete(users).where(eq(users.id, id));
}
