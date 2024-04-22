const { v4: uuidv4 } = require('uuid');

const dbEngine = require("../lib/mysqlEngine");
const constants = require("../utils/constants");

// Function to insert a new category into the database
async function insertCategory(name, description) {
    try {
        let query = `INSERT INTO ?? (name, description) VALUES (?, ?)`;

        let values = [constants['table']['CATEGORIES_DETAILS'], name, description];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        return result?.insertId;
    } catch (error) {
        console.error('Error inserting category:', error);
        throw new Error('Error inserting category');
    }
}

async function insertSubcategory(name, description, categoryId) {
    try {
        let query = `INSERT INTO ?? (name, description, category_id) VALUES (?, ?, ?)`;

        let values = [constants['table']['SUB_CATEGORIES_DETAILS'], name, description, categoryId];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        return result?.insertId;
    } catch (error) {
        console.error('Error inserting subcategory:', error);
        throw new Error('Error inserting subcategory');
    }
}

async function insertProduct(name, description, price, subcategoryId) {
    try {
        let query = `INSERT INTO ?? (name, description, price, subcategory_id) VALUES (?, ?, ?, ?)`;

        let values = [constants['table']['PRODUCT_DETAILS'], name, description, price, subcategoryId];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        return result.insertId;
    } catch (error) {
        console.error('Error inserting product:', error);
        throw new Error('Error inserting product');
    }
}

async function updateCategory(categoryId, name, description) {
    try {
        let query = `UPDATE ?? SET name = ?, description = ? WHERE id = ?`;

        let values = [constants['table']['CATEGORIES_DETAILS'], name, description, categoryId];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        if (result.affectedRows === 0) {
            throw new Error('Category not found or update failed');
        }

        return 'Category updated successfully';
    } catch (error) {
        console.error('Error updating category:', error);
        throw new Error('Error updating category');
    }
}

async function updateSubcategory(subcategoryId, name, description, categoryId) {
    try {
        let query = `UPDATE ?? SET name = ?, description = ?, category_id = ? WHERE id = ?`;

        let values = [constants['table']['SUB_CATEGORIES_DETAILS'], name, description, categoryId, subcategoryId];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        if (result.affectedRows === 0) {
            throw new Error('Subcategory not found or update failed');
        }

        return 'Subcategory updated successfully';
    } catch (error) {
        console.error('Error updating subcategory:', error);
        throw new Error('Error updating subcategory');
    }
}

async function updateProduct(productId, name, description, price, subcategoryId) {
    try {
        let query = `UPDATE ?? SET name = ?, description = ?, price = ?, subcategory_id = ? WHERE id = ?`;

        let values = [constants['table']['PRODUCT_DETAILS'], name, description, price, subcategoryId, productId];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        if (result.affectedRows === 0) {
            throw new Error('Product not found or update failed');
        }

        return 'Product updated successfully';
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Error updating product');
    }
}

async function getCategories() {
    try {
        let query = `SELECT id as cid, name as cn, description as cd FROM ??`;
        let values = [constants['table']['CATEGORIES_DETAILS']];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        return result; // Return the list of categories
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Error fetching categories');
    }
}

async function getSubcategoriesWithCategories() {
    try {
        let query = `SELECT sub.id AS sid, sub.name AS sn, sub.description AS sd, 
                            cat.id AS cid, cat.name AS cn, cat.description AS cd
                     FROM ?? AS sub
                     INNER JOIN ?? AS cat ON sub.category_id = cat.id`;

        let values = [constants['table']['SUB_CATEGORIES_DETAILS'], constants['table']['CATEGORIES_DETAILS']];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        return result; // Return the list of subcategories with their categories
    } catch (error) {
        console.error('Error fetching subcategories with categories:', error);
        throw new Error('Error fetching subcategories with categories');
    }
}

async function getProductsWithSubcategoriesAndCategories() {
    try {
        let query = `SELECT prod.id AS pid, prod.name AS pn, prod.description AS pd, prod.price AS pp,
                            sub.id AS sid, sub.name AS sn, sub.description AS sd, 
                            cat.id AS cid, cat.name AS cn, cat.description AS cd
                     FROM ?? AS prod
                     INNER JOIN ?? AS sub ON prod.subcategory_id = sub.id
                     INNER JOIN ?? AS cat ON sub.category_id = cat.id`;

        let values = [constants['table']['PRODUCT_DETAILS'], constants['table']['SUB_CATEGORIES_DETAILS'], constants['table']['CATEGORIES_DETAILS']];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        return result; // Return the list of products with their subcategories and categories
    } catch (error) {
        console.error('Error fetching products with subcategories and categories:', error);
        throw new Error('Error fetching products with subcategories and categories');
    }
}

async function deleteCategory(categoryId) {
    try {
        // Delete mapped products first
        let deleteProductsQuery = `DELETE FROM products WHERE subcategory_id IN (SELECT id FROM subcategories WHERE category_id = ?)`;
        let deleteProductsValues = [categoryId];
        let deleteProductsSql = dbEngine.mysqlFormat(deleteProductsQuery, deleteProductsValues);
        await dbEngine.executeQuery(deleteProductsSql);

        // Delete mapped subcategories
        let deleteSubcategoriesQuery = `DELETE FROM subcategories WHERE category_id = ?`;
        let deleteSubcategoriesValues = [categoryId];
        let deleteSubcategoriesSql = dbEngine.mysqlFormat(deleteSubcategoriesQuery, deleteSubcategoriesValues);
        await dbEngine.executeQuery(deleteSubcategoriesSql);

        // Then, delete the category
        let deleteCategoryQuery = `DELETE FROM categories WHERE id = ?`;
        let deleteCategoryValues = [categoryId];
        let deleteCategorySql = dbEngine.mysqlFormat(deleteCategoryQuery, deleteCategoryValues);
        let result = await dbEngine.executeQuery(deleteCategorySql);

        if (result.affectedRows === 0) {
            throw new Error('Category not found or delete failed');
        }

        return 'Category, mapped subcategories, and mapped products deleted successfully';
    } catch (error) {
        console.error('Error deleting category and its mappings:', error);
        throw new Error('Error deleting category and its mappings');
    }
}

async function deleteSubcategory(subcategoryId) {
    try {
        // First, delete associated products
        let deleteProductsQuery = `DELETE FROM products WHERE subcategory_id = ?`;
        let deleteProductsValues = [subcategoryId];
        let deleteProductsSql = dbEngine.mysqlFormat(deleteProductsQuery, deleteProductsValues);
        await dbEngine.executeQuery(deleteProductsSql);

        // Then, delete the subcategory
        let deleteSubcategoryQuery = `DELETE FROM subcategories WHERE id = ?`;
        let deleteSubcategoryValues = [subcategoryId];
        let deleteSubcategorySql = dbEngine.mysqlFormat(deleteSubcategoryQuery, deleteSubcategoryValues);
        let result = await dbEngine.executeQuery(deleteSubcategorySql);

        if (result.affectedRows === 0) {
            throw new Error('Subcategory not found or delete failed');
        }

        return 'Subcategory and associated products deleted successfully';
    } catch (error) {
        console.error('Error deleting subcategory:', error);
        throw new Error('Error deleting subcategory');
    }
}

async function deleteProduct(productId) {
    try {
        let query = `DELETE FROM products WHERE id = ?`;

        let values = [productId];
        let sql = dbEngine.mysqlFormat(query, values);
        let result = await dbEngine.executeQuery(sql);

        if (result.affectedRows === 0) {
            throw new Error('Product not found or delete failed');
        }

        return 'Product deleted successfully';
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Error deleting product');
    }
}

const searchProductsByName = async (name) => {
    try {
        const query = 'SELECT * FROM ?? WHERE name LIKE ?';
        let values = [constants['table']['PRODUCT_DETAILS'], `%${name}%`];

        let sql = dbEngine.mysqlFormat(query, values);
        let rows = await dbEngine.executeQuery(sql);

        return rows;
    } catch (error) {
        console.error('Error searching products by name:', error);
        throw new Error('Error searching products');
    }
};


module.exports = {
    insertCategory,
    insertSubcategory,
    insertProduct,
    updateCategory,
    updateSubcategory,
    updateProduct,
    getCategories,
    getSubcategoriesWithCategories,
    getProductsWithSubcategoriesAndCategories,
    deleteCategory,
    deleteSubcategory,
    deleteProduct,
    searchProductsByName
};