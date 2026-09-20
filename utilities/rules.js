const Joi = require("joi")

const adminValidation = Joi.object({
    username : Joi.string().min(3).required(),
    password : Joi.string().min(8).required()
})

const createVedioTagValidation = Joi.object({
    tag : Joi.string().min(3).required()
})

const enableDisableTagValidation = Joi.object({
  status : Joi.boolean().required()  
})

const vediosValidation = Joi.object({
    title : Joi.string().min(8).required(),
    name : Joi.string().min(3).required(),
    description : Joi.string().required(),
    vedio_url : Joi.string().required(),
    thumbnail_url : Joi.string().optional(),
    views : Joi.number().required(),
    tags: Joi.array().items(Joi.number()).required(),
    cuts : Joi.number().optional(),
    is_home_screen : Joi.boolean().optional()
})

const processValidation = Joi.object({
    title : Joi.string().min(3).required(),
    description : Joi.string().required(),
    points : Joi.array().items(Joi.string()).required(),
    is_home_screen : Joi.boolean().optional()
})

const reviewsValidation = Joi.object({
    first_name : Joi.string().min(3).required(),
    last_name : Joi.string().min(3).required(),
    rating : Joi.number().precision(2).required(),
    occupation : Joi.string().required(),
    state : Joi.string().required(),
    country : Joi.string().required(),
    role : Joi.string().required(),
    is_retained : Joi.boolean().optional(),
    message : Joi.string().required()
})
module.exports = {
    adminValidation,
    createVedioTagValidation,
    enableDisableTagValidation,
    vediosValidation,
    processValidation,
    reviewsValidation,
}