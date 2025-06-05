// src/services/products/productService.js
import { db } from '../../db/index.js';
import { products } from '../../models/product.js';
import { categories } from '../../models/category.js';
import { eq } from 'drizzle-orm';

export const getAllProductsService = async () => {
  try {
    return await db.select().from(products);
  } catch (error) {
    console.error('Database error in getAllProductsService:', error);
    throw new Error('Ürünler veritabanından alınamadı.');
  }
};

export const getProductByIdService = async (id) => {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('Geçersiz ürün ID\'si.');
    }

    const result = await db.select().from(products).where(eq(products.id, Number(id)));
    return result[0] || null;
  } catch (error) {
    console.error('Database error in getProductByIdService:', error);
    if (error.message === 'Geçersiz ürün ID\'si.') {
      throw error;
    }
    throw new Error('Ürün veritabanından alınamadı.');
  }
};

export async function createProductService(data) {
  const {
    name,
    description = null,
    price,
    image_url = null,
    category_id,
    is_active = true,
  } = data;

  // Basit validasyon
  if (!name || !price || !category_id) {
    throw new Error("Gerekli alanlar eksik: 'name', 'price', 'category_id'");
  }

  try {
    const result = await db.insert(products).values({
      name,
      description,
      price,
      image_url,
      category_id,
      is_active,
    });

    return {
      success: true,
      message: 'Ürün başarıyla eklendi.',
      data: result,
    };
  } catch (error) {
    console.error('❌ Ürün eklenirken hata oluştu:', error);
    return {
      success: false,
      message: 'Ürün eklenemedi.',
      error: error.message,
    };
  }
}

export const updateProductService = async (id, data) => {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('Geçersiz ürün ID\'si.');
    }

    // Check if product exists
    const existingProduct = await getProductByIdService(id);
    if (!existingProduct) {
      throw new Error('Güncellenecek ürün bulunamadı.');
    }

    // If category_id is being updated, check if it exists
    if (data.category_id) {
      const categoryExists = await db.select().from(categories).where(eq(categories.id, Number(data.category_id)));
      if (categoryExists.length === 0) {
        throw new Error('Seçilen kategori bulunamadı.');
      }
    }

    // Prepare data for update (only include provided fields)
    const updateData = {};
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.description !== undefined) updateData.description = data.description ? data.description.trim() : null;
    if (data.price !== undefined) updateData.price = Number(data.price);
    if (data.category_id !== undefined) updateData.category_id = Number(data.category_id);
    if (data.image_url !== undefined) updateData.image_url = data.image_url ? data.image_url.trim() : null;
    if (data.is_active !== undefined) updateData.is_active = Boolean(data.is_active);

    const result = await db.update(products).set(updateData).where(eq(products.id, Number(id)));
    return result;
  } catch (error) {
    console.error('Database error in updateProductService:', error);
    if (error.message.includes('Geçersiz') || error.message.includes('bulunamadı')) {
      throw error;
    }
    throw new Error('Ürün güncellenemedi.');
  }
};

export const deleteProductService = async (id) => {
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error('Geçersiz ürün ID\'si.');
    }

    // Check if product exists
    const existingProduct = await getProductByIdService(id);
    if (!existingProduct) {
      throw new Error('Silinecek ürün bulunamadı.');
    }

    const result = await db.delete(products).where(eq(products.id, Number(id)));
    return result;
  } catch (error) {
    console.error('Database error in deleteProductService:', error);
    if (error.message.includes('Geçersiz') || error.message.includes('bulunamadı')) {
      throw error;
    }
    throw new Error('Ürün silinemedi.');
  }
};
