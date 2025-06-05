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

    const result = await db.select().from(categories).where(eq(categories.id, Number(id)));
    return result[0] || null;
  } catch (error) {
    console.error('Database error in getCategory:', error);
    if (error.message === 'Geçersiz kategori ID\'si.') {
      throw error;
    }
    throw new Error('Kategori veritabanından alınamadı.');
  }
}

export async function createNewCategory(data) {
  try {
    // Validate required fields
    if (!data.title || data.title.trim() === '') {
      throw new Error('Kategori başlığı gereklidir.');
    }

    // Check if category with same title already exists
    const existingCategory = await db.select().from(categories).where(eq(categories.title, data.title.trim()));
    if (existingCategory.length > 0) {
      throw new Error('Bu başlıkta bir kategori zaten mevcut.');
    }

    const categoryData = {
      title: data.title.trim(),
      is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
    };

    const result = await db.insert(categories).values(categoryData);
    return result;
  } catch (error) {
    console.error('Database error in createNewCategory:', error);
    if (error.message.includes('gereklidir') || error.message.includes('mevcut')) {
      throw error;
    }
    throw new Error('Kategori veritabanına kaydedilemedi.');
  }
}

export async function updateExistingCategory(id, data) {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('Geçersiz kategori ID\'si.');
    }

    // Check if category exists
    const existingCategory = await getCategory(id);
    if (!existingCategory) {
      throw new Error('Güncellenecek kategori bulunamadı.');
    }

    // If title is being updated, check for duplicates
    if (data.title && data.title.trim() !== existingCategory.title) {
      const duplicateCategory = await db.select().from(categories).where(eq(categories.title, data.title.trim()));
      if (duplicateCategory.length > 0) {
        throw new Error('Bu başlıkta bir kategori zaten mevcut.');
      }
    }

    // Prepare data for update (only include provided fields)
    const updateData = {};
    if (data.title !== undefined) updateData.title = data.title.trim();
    if (data.is_active !== undefined) updateData.is_active = Boolean(data.is_active);

    const result = await db.update(categories).set(updateData).where(eq(categories.id, Number(id)));
    return result;
  } catch (error) {
    console.error('Database error in updateExistingCategory:', error);
    if (error.message.includes('Geçersiz') || error.message.includes('bulunamadı') || error.message.includes('mevcut')) {
      throw error;
    }
    throw new Error('Kategori güncellenemedi.');
  }
}

export async function deleteExistingCategory(id) {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('Geçersiz kategori ID\'si.');
    }

    // Check if category exists
    const existingCategory = await getCategory(id);
    if (!existingCategory) {
      throw new Error('Silinecek kategori bulunamadı.');
    }

    // Note: In a real application, you might want to check if there are products
    // associated with this category before allowing deletion

    const result = await db.delete(categories).where(eq(categories.id, Number(id)));
    return result;
  } catch (error) {
    console.error('Database error in deleteExistingCategory:', error);
    if (error.message.includes('Geçersiz') || error.message.includes('bulunamadı')) {
      throw error;
    }
    throw new Error('Kategori silinemedi.');
  }
}
