import { db } from '../../db/index.js';
import { categories } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export async function getCategories() {
  try {
    return await db.select().from(categories);
  } catch (error) {
    console.error('Database error in getCategories:', error);
    throw new Error('Kategoriler veritabanından alınamadı.');
  }
}

export async function getCategory(id) {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('Geçersiz kategori ID\'si.');
    }

    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, Number(id)));

    return result[0] || null;
  } catch (error) {
    console.error('Database error in getCategory:', error);
    throw error.message.includes('Geçersiz')
      ? error
      : new Error('Kategori veritabanından alınamadı.');
  }
}

export async function createNewCategory(data) {
  try {
    if (!data.title || data.title.trim() === '') {
      throw new Error('Kategori başlığı gereklidir.');
    }

    const existingCategory = await db
      .select()
      .from(categories)
      .where(eq(categories.title, data.title.trim()));

    if (existingCategory.length > 0) {
      throw new Error('Bu başlıkta bir kategori zaten mevcut.');
    }

    const categoryData = {
      title: data.title.trim(),
      is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
    };

    await db.insert(categories).values(categoryData);

    // Eklenen son kategoriyi başlığa göre tekrar getir (ID yerine)
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.title, categoryData.title));

    return result[0]; // yeni eklenen kategori
  } catch (error) {
    console.error('Database error in createNewCategory:', error);
    throw error.message.includes('gereklidir') || error.message.includes('mevcut')
      ? error
      : new Error('Kategori veritabanına kaydedilemedi.');
  }
}
export async function updateExistingCategory(id, data) {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('Geçersiz kategori ID\'si.');
    }

    const existingCategory = await getCategory(id);
    if (!existingCategory) {
      throw new Error('Güncellenecek kategori bulunamadı.');
    }

    if (data.title && data.title.trim() !== existingCategory.title) {
      const duplicate = await db
        .select()
        .from(categories)
        .where(eq(categories.title, data.title.trim()));

      if (duplicate.length > 0) {
        throw new Error('Bu başlıkta bir kategori zaten mevcut.');
      }
    }

    const updateData = {};
    if (data.title !== undefined) updateData.title = data.title.trim();
    if (data.is_active !== undefined) updateData.is_active = Boolean(data.is_active);

    await db.update(categories).set(updateData).where(eq(categories.id, Number(id)));
    return;
  } catch (error) {
    console.error('Database error in updateExistingCategory:', error);
    throw error.message.includes('Geçersiz') || error.message.includes('bulunamadı') || error.message.includes('mevcut')
      ? error
      : new Error('Kategori güncellenemedi.');
  }
}

export async function deleteExistingCategory(id) {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('Geçersiz kategori ID\'si.');
    }

    const existingCategory = await getCategory(id);
    if (!existingCategory) {
      throw new Error('Silinecek kategori bulunamadı.');
    }

    await db.delete(categories).where(eq(categories.id, Number(id)));
  } catch (error) {
    console.error('Database error in deleteExistingCategory:', error);
    throw error.message.includes('Geçersiz') || error.message.includes('bulunamadı')
      ? error
      : new Error('Kategori silinemedi.');
  }
}