import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} from '../../services/products/productService.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ error: 'Ürünler alınırken hata oluştu.' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await getProductByIdService(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı.' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Get product by id error:', error);
    res.status(500).json({ error: 'Ürün alınırken hata oluştu.' });
  }
};


// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, category_id } = req.body;

    // Input validation
    if (!name || !price || !category_id) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        error: 'Ürün adı, fiyat ve kategori gereklidir.'
      });
    }

    // Prepare product data
    const productData = {
      name,
      description: req.body.description || '',
      price: parseFloat(price),
      category_id: parseInt(category_id),
      image_url: req.file ? `/uploads/${req.file.filename}` : null,
      is_active: req.body.is_active !== undefined ? Boolean(req.body.is_active) : true,
    };

    // Create product
    const result = await createProductService(productData);

    // Return the created product directly
    res.status(201).json({
      id: result.insertId,
      ...productData
    });

  } catch (error) {
    console.error('Create product error:', error);
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError);
      }
    }
    res.status(500).json({
      error: error.message || 'Ürün eklenirken hata oluştu.'
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    // Check if product exists
    const existingProduct = await getProductByIdService(req.params.id);
    if (!existingProduct) {
      // If validation fails and file was uploaded, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Ürün bulunamadı.' });
    }

    // Input validation
    const { name, price, category_id } = req.body;
    if (name !== undefined && !name) {
      // If validation fails and file was uploaded, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        error: 'Ürün adı boş olamaz.'
      });
    }

    if (price !== undefined && price <= 0) {
      // If validation fails and file was uploaded, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        error: 'Fiyat pozitif bir değer olmalıdır.'
      });
    }

    if (category_id !== undefined && !category_id) {
      // If validation fails and file was uploaded, delete it
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        error: 'Kategori gereklidir.'
      });
    }

    // Prepare update data
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (category_id !== undefined) updateData.category_id = parseInt(category_id);
    if (req.body.is_active !== undefined) updateData.is_active = Boolean(req.body.is_active);

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (existingProduct.image_url) {
        const oldImagePath = path.join(__dirname, '../../public', existingProduct.image_url);
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        } catch (deleteError) {
          console.error('Error deleting old image:', deleteError);
        }
      }
      updateData.image_url = `/uploads/${req.file.filename}`;
    }

    await updateProductService(req.params.id, updateData);

    // Get the updated product to return it
    const updatedProduct = await getProductByIdService(req.params.id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);

    // If error occurs and file was uploaded, delete it
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting uploaded file:', unlinkError);
      }
    }

    res.status(500).json({
      error: error.message || 'Ürün güncellenirken hata oluştu.'
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Check if product exists
    const existingProduct = await getProductByIdService(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Ürün bulunamadı.' });
    }

    // Delete associated image file if exists
    if (existingProduct.image_url) {
      const imagePath = path.join(__dirname, '../../public', existingProduct.image_url);
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (deleteError) {
        console.error('Error deleting image file:', deleteError);
      }
    }

    await deleteProductService(req.params.id);
    res.status(200).json({ message: 'Ürün başarıyla silindi.' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      error: error.message || 'Ürün silinirken hata oluştu.'
    });
  }
};
