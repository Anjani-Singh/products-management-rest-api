const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.number().valid(1, 2, 3).required(),
  createdBy: Joi.string().pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i).required(),
});


const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, errors: error.details.map(detail => detail.message) });
  }
  next(); 
};

module.exports = validateUser;
