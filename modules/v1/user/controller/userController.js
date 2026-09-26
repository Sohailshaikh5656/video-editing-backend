const middleware = require("../../../../middleware/validation")
const userModel = require("../model/userModel")
const validationRules = require("../../../../utilities/rules")

/**
 * Reads `:id` / `:search` route params, falling back to `?id=` / `?search=`
 * query strings (the user routes only register the base paths).
 *
 * Kept as a plain function because the routes register the handlers unbound —
 * `this` is undefined inside them, so a class helper could not be used.
 */
function buildRequestData(req){
    return {
        id : req.params?.id ?? req.query?.id ?? null,
        search : req.params?.search ?? req.query?.search ?? null
    }
}

class UserController{
    constructor(){

    }

    async getVideos(req, res){
        try{
            let message = await userModel.getVideos(buildRequestData(req))
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, { error : error.message || error })
        }
    }

    async tags(req, res){
        try{
            let message = await userModel.tags(buildRequestData(req))
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, { error : error.message || error })
        }
    }

    async getProcess(req, res){
        try{
            let message = await userModel.getProcess(buildRequestData(req))
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, { error : error.message || error })
        }
    }

    async getReviews(req, res){
        try{
            let message = await userModel.getReviews(buildRequestData(req))
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, { error : error.message || error })
        }
    }

    async getJournalCategory(req, res){
        try{
            let message = await userModel.getJournalCategory(buildRequestData(req))
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, { error : error.message || error })
        }
    }

    async getJournal(req, res){
        try{
            let message = await userModel.getJournal(buildRequestData(req))
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, { error : error.message || error })
        }
    }

    async getReelsCategory(req, res){
        try{
            let message = await userModel.getReelsCategory(buildRequestData(req))
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, { error : error.message || error })
        }
    }

    async getReels(req, res){
        try{
            let message = await userModel.getReels(buildRequestData(req))
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, { error : error.message || error })
        }
    }

    async createContact(req, res){
        try{
            let responseData = req.body
            let validateContact = validationRules.inquiryValidation
            let {error, values} = validateContact.validate(responseData)

            if(error){
                return middleware.sendResponse(req, res, { error : error.message || error })
            }

            let message = await userModel.createContact(responseData)
            return middleware.sendResponse(req, res, message)
        }catch(error) {
             return middleware.sendResponse(req, res, { error : error.message || error })
        }   

    }
    
}

module.exports = new UserController()