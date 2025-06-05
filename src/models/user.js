// src/models/user.js

import { mysqlTable, varchar, int, boolean, timestamp } from 'drizzle-orm/mysql-core';
import { roles } from './role.js';

export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role_id: int('role_id')
    .notNull()
    .references(() => roles.id), // yeni ilişki
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow().defaultNow()
});