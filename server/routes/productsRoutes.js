const router = require("express").Router();

const prodController = require('../controllers/prodController')
const validation = require('../middleware/validation/prodValidation');
const verifyToken = require('../middleware/authentication/authMiddleware');
const uploadImageToS3 = require('../lib/upload'); // Use as middleware for upload in the prodct api.


router.post('/categories', verifyToken, validation.validateCategory, prodController.categories);
router.post('/sub-categories', verifyToken, validation.validateSubcategory, prodController.subcategories);
router.post('/product', verifyToken, validation.validateProduct, prodController.products);


router.get('/categories', verifyToken, prodController.getCategories);
router.get('/subcategories', verifyToken, prodController.getSubcategoriesWithCategories);
router.get('/products', verifyToken, prodController.getProductsWithSubcategoriesAndCategories);


router.put('/categories/:categoryId/:roleId', verifyToken, validation.validateUpdateCategory, prodController.updateCategory);
router.put('/subcategories/:subcategoryId/:roleId', verifyToken, validation.validateUpdateSubcategory, prodController.updateSubcategory);
router.put('/products/:productId/:roleId', verifyToken, validation.validateUpdateProduct, prodController.updateProduct);


router.delete('/categories/:categoryId/:roleId', verifyToken, prodController.deleteCategory);
router.delete('/subcategories/:subcategoryId/:roleId', verifyToken, prodController.deleteSubcategory);
router.delete('/products/:productId/:roleId', verifyToken, prodController.deleteProduct);

router.get('/search', verifyToken, prodController.searchProducts);




module.exports = router;