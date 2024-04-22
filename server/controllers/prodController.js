const prodModels = require('../models/prodModels');
const util = require('../utils/util');
const constants = require("../utils/constants");

const statusMessage = constants.statusMessage();
const statusCode = constants.statusCode();

const categories = async (req, res) => {
  try {
    const { name, description, roleId } = req.body;

    // Check if roleId is 1 or 2
    if (roleId == 1 || roleId == 2) {
      const insertedId = await prodModels.insertCategory(name, description);
      res.status(statusCode['OK']).json({ success: true, message: statusMessage['CATEGORIES_INSERTED'] });
    } else {
      res.status(statusCode['FORBIDDEN']).json({ success: false, message: statusMessage['PERMSSION_DENIED'] });
    }
  } catch (error) {
    util.log('Error from categories API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const subcategories = async (req, res) => {
  try {
    const { name, description, categoryId, roleId } = req.body;

    // Check if roleId is 1 or 2
    if (roleId == 1 || roleId == 2) {
      const insertedId = await prodModels.insertSubcategory(name, description, categoryId);
      res.status(statusCode['OK']).json({ success: true, message: statusMessage['SUBCATEGORIES_INSERTED'] });
    } else {
      res.status(statusCode['FORBIDDEN']).json({ success: false, message: statusMessage['PERMSSION_DENIED'] });
    }
  } catch (error) {
    util.log('Error from subcategories API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const products = async (req, res) => {
  try {
    const { name, description, price, subcategoryId, roleId } = req.body;

    // Check if roleId is 1 or 2
    if (roleId == 1 || roleId == 2) {
      const insertedId = await prodModels.insertProduct(name, description, price, subcategoryId);
      res.status(statusCode['OK']).json({ success: true, message: statusMessage['PRODUCT_INSERTED'] });
    } else {
      res.status(statusCode['FORBIDDEN']).json({ success: false, message: statusMessage['PERMSSION_DENIED'] });
    }
  } catch (error) {
    util.log('Error from products API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { categoryId, roleId } = req.params;

    // Check if roleId is 1 or 2
    if (roleId == 1 || roleId == 2) {
      const message = await prodModels.updateCategory(categoryId, name, description);
      res.status(statusCode['OK']).json({ success: true, message });
    } else {
      res.status(statusCode['FORBIDDEN']).json({ success: false, message: statusMessage['PERMSSION_DENIED'] });
    }
  } catch (error) {
    util.log('Error from update category API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const updateSubcategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const { subcategoryId, roleId } = req.params;

    // Check if roleId is 1 or 2
    if (roleId == 1 || roleId == 2) {
      const message = await prodModels.updateSubcategory(subcategoryId, name, description, categoryId);
      res.status(statusCode['OK']).json({ success: true, message });
    } else {
      res.status(statusCode['FORBIDDEN']).json({ success: false, message: statusMessage['PERMSSION_DENIED'] });
    }
  } catch (error) {
    util.log('Error from update subcategory API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, subcategoryId } = req.body;
    const { productId, roleId } = req.params;

    // Check if roleId is 1 or 2
    if (roleId == 1 || roleId == 2) {
      const message = await prodModels.updateProduct(productId, name, description, price, subcategoryId);
      res.status(statusCode['OK']).json({ success: true, message });
    } else {
      res.status(statusCode['FORBIDDEN']).json({ success: false, message: statusMessage['PERMSSION_DENIED'] });
    }
  } catch (error) {
    util.log('Error from update product API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await prodModels.getCategories();
    res.status(statusCode['OK']).json({ success: true, message: statusMessage['CATEGORIES_INFO'], data: categories });
  } catch (error) {
    util.log('Error from get categories API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const getSubcategoriesWithCategories = async (req, res) => {
  try {
    const subcategories = await prodModels.getSubcategoriesWithCategories();
    res.status(statusCode['OK']).json({ success: true, message: statusMessage['SUBCATEGORIES_INFO'], data: subcategories });
  } catch (error) {
    util.log('Error from get subcategories with categories API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const getProductsWithSubcategoriesAndCategories = async (req, res) => {
  try {
    const products = await prodModels.getProductsWithSubcategoriesAndCategories();
    res.status(statusCode['OK']).json({ success: true, message: statusMessage['PRODUCT_INFO'], data: products });
  } catch (error) {
    util.log('Error from get products with subcategories and categories API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId, roleId } = req.params;

    if (roleId == 1) {
      const message = await prodModels.deleteCategory(categoryId);
      res.status(statusCode['OK']).json({ success: true, message: statusMessage['DELETE_CATEGORIES_INFO'] });
    } else {
      res.status(statusCode['FORBIDDEN']).json({ success: false, message: statusMessage['PERMSSION_DENIED'] });
    }
  } catch (error) {
    util.log('Error from delete category API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    const { subcategoryId, roleId } = req.params;

    if (roleId == 1) {
      const message = await prodModels.deleteSubcategory(subcategoryId);
      res.status(statusCode['OK']).json({ success: true, message: statusMessage['DELETE_SUBCATEGORIES_INFO'] });
    } else {
      res.status(statusCode['FORBIDDEN']).json({ success: false, message: statusMessage['PERMSSION_DENIED'] });
    }
  } catch (error) {
    util.log('Error from delete subcategory API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId, roleId } = req.params;

    if (roleId == 1) {
      const message = await prodModels.deleteProduct(productId);
      res.status(statusCode['OK']).json({ success: true, message: statusMessage['DELETE_PRODUCT_INFO'] });
    } else {
      res.status(statusCode['FORBIDDEN']).json({ success: false, message: statusMessage['PERMSSION_DENIED'] });
    }
  } catch (error) {
    util.log('Error from delete product API', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;

    const searchResults = await prodModels.searchProductsByName(name);
    res.status(statusCode['OK']).json({ success: true, data: searchResults });

  } catch (error) {
    util.log('Error searching products', error);
    res.status(statusCode['FIVE_ZERO_ZERO']).json({ success: false, message: statusMessage['INTERNAL_SERVER_ERROR'] });
  }
};


module.exports = {
  categories,
  subcategories,
  products,
  updateCategory,
  updateSubcategory,
  updateProduct,
  getCategories,
  getSubcategoriesWithCategories,
  getProductsWithSubcategoriesAndCategories,
  deleteCategory,
  deleteSubcategory,
  deleteProduct,
  searchProducts
}