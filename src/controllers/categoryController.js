import { pool } from '../config/database.js';

// Tüm kategorileri getir
export const getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        id,
        name,
        description,
        image_url,
        is_active,
        created_at,
        updated_at
      FROM categories
      WHERE is_active = 1
      ORDER BY name ASC
    `);
    
    res.status(200).json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Kategoriler getirilirken hata oluştu',
      error: error.message
    });
  }
};