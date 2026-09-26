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


const journalCategoryValidation = Joi.object({
    name : Joi.string().min(3).required(),  
})
const journalValidation = Joi.object({
    category_id : Joi.number().required(),
    time : Joi.string().required(),
    time_type : Joi.string().required(),
    title : Joi.string().min(3).required(),
    description : Joi.string().required(),
    image_url : Joi.string().required(),
    text : Joi.string().required(),
})

const reelsCategoryValidation = Joi.object({
    name : Joi.string().min(3).required(),  
})
const reelsValidation = Joi.object({
    name : Joi.string().min(3).required(),
    reel_url : Joi.string().required(),
    thumbnail_url : Joi.string().optional(),
    category_id : Joi.number().required(),
    our_role : Joi.string().required(),
    start_date : Joi.string().required(),
    end_date : Joi.string().required(),
    description : Joi.string().required(),
})

const inquiryValidation = Joi.object({
    full_name : Joi.string().required(),
    email : Joi.string().email().required(),
    company : Joi.string().required(),
    timezone : Joi.string().required(),
    project_type : Joi.string().required(),
    brief : Joi.string().required(),
    budget : Joi.string().required(),
    target_date : Joi.string().required(),
    footage_url : Joi.string().required(),
    booking_time : Joi.string().required(),
})
module.exports = {
    adminValidation,
    createVedioTagValidation,
    enableDisableTagValidation,
    vediosValidation,
    processValidation,
    reviewsValidation,
    journalCategoryValidation,
    journalValidation,
    reelsValidation,
    reelsCategoryValidation,
    inquiryValidation
}
