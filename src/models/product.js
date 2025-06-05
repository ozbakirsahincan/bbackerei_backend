// src/models/product.js
import { mysqlTable, int, varchar, boolean, timestamp, text } from 'drizzle-orm/mysql-core';
import { categories } from './category.js';

export const products = mysqlTable('products', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: int('price').notNull(),
  image_url: varchar('image_url', { length: 512 }),
  category_id: int('category_id')
    .notNull()
    .references(() => categories.id),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow().defaultNow(),
});
