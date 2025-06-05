import {
  getCategories,
  getCategory,
  createNewCategory,
  updateExistingCategory,
  deleteExistingCategory,
} from '../../services/categories/categoryService.js';

export async function getAllCategories(req, res) {
  try {
    const data = await getCategories();
    res.json(data);
  } catch (error) {
    console.error('Get all categories error:', error);
    res.status(500).json({ error: error.message || 'Kategoriler alınamadı' });
  }
}

export async function getCategoryById(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Geçersiz kategori ID\'si' });
    }

    const data = await getCategory(id);
    if (!data) {
      return res.status(404).json({ error: 'Kategori bulunamadı' });
    }
    res.json(data);
  } catch (error) {
    console.error('Get category by id error:', error);
    res.status(500).json({ error: error.message || 'Kategori alınamadı' });
  }
}

export async function createCategory(req, res) {
  try {
    const { title, is_active } = req.body;

    // Input validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Kategori başlığı gereklidir' });
    }

    const categoryData = {
      title: title.trim(),
      is_active: is_active !== undefined ? Boolean(is_active) : true
    };

    const result = await createNewCategory(categoryData);

    // Get the created category to return it
    const createdCategory = await getCategory(result.insertId);

    res.status(201).json(createdCategory);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: error.message || 'Kategori eklenemedi' });
  }
}

export async function updateCategory(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Geçersiz kategori ID\'si' });
    }

    // Check if category exists
    const existingCategory = await getCategory(id);
    if (!existingCategory) {
      return res.status(404).json({ error: 'Kategori bulunamadı' });
    }

    // Input validation
    const { title, is_active } = req.body;
    if (title !== undefined && (!title || title.trim() === '')) {
      return res.status(400).json({ error: 'Kategori başlığı boş olamaz' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (is_active !== undefined) updateData.is_active = Boolean(is_active);

    await updateExistingCategory(id, updateData);

    // Get the updated category to return it
    const updatedCategory = await getCategory(id);

    res.json(updatedCategory);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: error.message || 'Kategori güncellenemedi' });
  }
}

export async function deleteCategory(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Geçersiz kategori ID\'si' });
    }

    // Check if category exists
    const existingCategory = await getCategory(id);
    if (!existingCategory) {
      return res.status(404).json({ error: 'Kategori bulunamadı' });
    }

    await deleteExistingCategory(id);
    res.json({ message: 'Kategori başarıyla silindi' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: error.message || 'Kategori silinemedi' });
  }
}
