const Joi = require('joi');

const categoryValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().allow('').trim(),
    roleId: Joi.number().integer().min(1).required(),
});

const validateCategory = (req, res, next) => {
    const { error } = categoryValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};

const subcategoryValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().allow('').trim(),
    categoryId: Joi.number().integer().min(1).required(),
    roleId: Joi.number().integer().min(1).required(),
});


const validateSubcategory = (req, res, next) => {
    const { error } = subcategoryValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};

const productValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().allow('').trim(),
    price: Joi.number().precision(2).min(0).required(),
    subcategoryId: Joi.number().integer().min(1).required(),
    roleId: Joi.number().integer().min(1).required(),
});

const validateProduct = (req, res, next) => {
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};


const updateCategoryValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().allow('').trim(),
});

const validateUpdateCategory = (req, res, next) => {
    const { error } = updateCategoryValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};

const updateSubcategoryValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().allow('').trim(),
    categoryId: Joi.number().integer().min(1).required(),
});

const validateUpdateSubcategory = (req, res, next) => {
    const { error } = updateSubcategoryValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};

const updateProductValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().allow('').trim(),
    price: Joi.number().precision(2).min(0).required(),
    subcategoryId: Joi.number().integer().min(1).required(),
});


const validateUpdateProduct = (req, res, next) => {
    const { error } = updateProductValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};


module.exports = {
    validateCategory,
    validateSubcategory,
    validateProduct,
    validateUpdateCategory,
    validateUpdateSubcategory,
    validateUpdateProduct,
};
