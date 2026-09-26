const middleware = require("../../../../middleware/validation")
const validationRule = require("../../../../utilities/rules")
const adminModel = require("../model/adminModel")

class AdminController {
    constructor() {}

    async login(req, res) {
        try {
            let requestData = req.body;
            console.log("Print : ", req.body)
            const adminValidation = validationRule.adminValidation;
            const { error, value } = adminValidation.validate(requestData);

            if (error) {
                console.log("Validation Error : ", error.details);
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }

            let message = await adminModel.login(requestData);
            return middleware.sendResponse(req, res, message);
        } catch (err) {
            console.log("Something went Wrong : ", err.message);
            return middleware.sendResponse(req, res, { error: err.message });
        }
    }

    async uploadFile(req, res){
        try{
            const responseData = await adminModel.uploadFile(req)
            return middleware.sendResponse(req, res, responseData)
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, { error: error.message || error});

        }
    }
    //VedioTagsOperations

    async createVedioTags(req, res){
        try{
            let requestData = req.body;
            console.log("Print : ", req.body)
            const vedioTagValidation = validationRule.createVedioTagValidation;
            const { error, value } = vedioTagValidation.validate(requestData);

            if (error) {
                console.log("Validation Error : ", error.details);
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }

            let message = await adminModel.createVedioTag(requestData);
            return middleware.sendResponse(req, res, message);
        }catch(err){
            console.log("Something went Wrong : ", err.message);
            return middleware.sendResponse(req, res, { error: err.message });
        }
    }

    async tags(req, res){
        try{
            let requestData = {
                id : req.params.id,
                search : req.params.search ?? null
            }
            let message = await adminModel.tags(requestData)
            return middleware.sendResponse(req, res, message)

        }catch(err){
            return middleware.sendResponse(req, res, { error: err.message });
        }
    }

    // Fixed argument order for enableDisableTag (should be (req, res), not (res, req))
    async enableDisableTag(req, res){
        try{
            let requestData = req.body
            console.log("Req : ", requestData)
            let statusValidation = validationRule.enableDisableTagValidation
            const {error , value} = statusValidation.validate(requestData)
            if (error) {
                console.log("Validation Error : ", error.details);
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }

            requestData.id = req.params.id
            let message = await adminModel.enableDisableTag(requestData);
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message });
        }
    }
    
    // Fixed argument order for updateTags (should be (req, res), not (res, req))
    async updateTags(req, res){
        try{
            let requestData = req.body
            let TagValidation = validationRule.createVedioTagValidation
            const {error , value} = TagValidation.validate(requestData)
            if (error) {
                console.log("Validation Error : ", error.details);
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }

            requestData.id = req.params.id

            let message = await adminModel.updateTags(requestData);
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message });
        }
    }

    async deleteTags(req, res){
        try{
            let requestData = {
                id: req.params.id
            }
            console.log("Res : ", requestData)
            let message = await adminModel.deleteTags(requestData);
            return middleware.sendResponse(req, res, message)
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message });
        }
    }


    //Vedio 
    async createVedios(req, res){
        try{
            let requestData = req.body
            let vedioValidation = validationRule.vediosValidation
            let {error, value} = vedioValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            let message = await adminModel.createVedios(requestData)   
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message });
   
        }
    }

    async getAllVedios(req, res){
        try{
            let requestData = {}
            if(req.params.id){
                requestData.id = req.params.id
            }
            if(req.params.search){
                requestData.search = req.params.search
            }

            console.log("Req", requestData)
            let message = await adminModel.getAllVedios(requestData)
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            console.log(error)

            return middleware.sendResponse(req, res, { error: error.message ||  error});       
        }
    }

    async updateVedios(req, res){
        try{
            let requestData = req.body
            console.log("Body : ", requestData)
            
            let vedioValidation = validationRule.vediosValidation
            let {error, value} = vedioValidation.validate(requestData)
            if(error){
                console.log("Naa Error Idhar Hai",error)
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            requestData.id = req.params.id
            console.log("Body 2: ", requestData)
            let message = await adminModel.updateVedios(requestData)   
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            console.log("error : ", error)
            return middleware.sendResponse(req, res, { error: error.message || error});
            
        }
    }
    
    async deleteVedios(req, res){
        try{
            let requestData = {}
            requestData.id = req.params.id
            let message = await adminModel.deleteVedios(requestData)
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("error : ", error)
            return middleware.sendResponse(req, res, { error: error.message || error});
            
        }
    }
    
    async createProcess(req, res){
        try{
            let requestData = req.body;
            let processValidation = validationRule.processValidation
            let {error, value} = processValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            let message = await adminModel.createProcess(requestData)   
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async getProcess(req, res){
        try{
            let requestData = {}
            if(req.params?.id){
                requestData.id = req.params.id
            }
            if(req.params?.search){
                requestData.search = req.params.search
            }

            let message = await adminModel.getProcess(requestData)
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            return middleware.sendResponse(req, res, {error:error?.message || error})
        }
    }

    async updateProcess(req, res){
        try{
            let requestData = req.body;
            let processValidation = validationRule.processValidation
            let {error, value} = processValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            requestData.id = req.params.id
            let message = await adminModel.updateProcess(requestData)   
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }


    async deleteProcess(req, res){
        try{
            let requestData = {}
            requestData.id = req.params.id
            let message = await adminModel.deleteProcess(requestData)
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("error : ", error)
            return middleware.sendResponse(req, res, { error: error.message || error});
            
        }
    }


    //Reviews

    async createReview(req, res){
        try{
            let requestData = req.body;
            let reviewsValidation = validationRule.reviewsValidation
            let {error, value} = reviewsValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            let message = await adminModel.createReview(requestData)   
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async getReviews(req, res){
        try{
            let requestData = {}
            if(req.params?.id){
                requestData.id = req.params.id
            }
            if(req.params?.search){
                requestData.search = req.params.search
            }

            let message = await adminModel.getReview(requestData)
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            console.log("Error : ", error)
            return middleware.sendResponse(req, res, {error:error?.message || error})
        }
    }

    async updateReviews(req, res){
        try{
            let requestData = req.body;
            let reviewsValidation = validationRule.reviewsValidation
            let {error, value} = reviewsValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            requestData.id = req.params.id
            let message = await adminModel.updateReviews(requestData)   
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }


    async deleteReviews(req, res){
        try{
            let requestData = {}
            requestData.id = req.params.id
            let message = await adminModel.deleteReviews(requestData)
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("error : ", error)
            return middleware.sendResponse(req, res, { error: error.message || error});
            
        }
    }

    //Journal Category

    async createJournalCategory(req, res){
        try{
            let requestData = req.body;
            let journalCategoryValidation = validationRule.journalCategoryValidation
            let {error, value} = journalCategoryValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            let message = await adminModel.createJournalCategory(requestData)   
            return middleware.sendResponse(req, res, message);
   
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async getJournalCategory(req, res){
        try{
            let requestData = {}
            if(req.params?.id){
                requestData.id = req.params.id
            }
            if(req.params?.search){
                requestData.search = req.params.search
            }

            let message = await adminModel.getJournalCategory(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, {error:error?.message || error})
        }
    }

    async updateJournalCategory(req, res){
        try{
            let requestData = req.body;
            let journalCategoryValidation = validationRule.journalCategoryValidation
            let {error, value} = journalCategoryValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }

            requestData.id = req.params.id
            let message = await adminModel.updateJournalCategory(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async deleteJournalCategory(req, res){
        try{
            let requestData = {}
            requestData.id = req.params.id
            let message = await adminModel.deleteJournalCategory(requestData)
            return middleware.sendResponse(req, res, message)
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    //Journal

    async createJournal(req, res){
        try{
            let requestData = req.body;
            let journalValidation = validationRule.journalValidation
            let {error, value} = journalValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }

            let message = await adminModel.createJournal(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async getJournal(req, res){
        try{
            let requestData = {}
            if(req.params?.id){
                requestData.id = req.params.id
            }
            if(req.params?.search){
                requestData.search = req.params.search
            }

            let message = await adminModel.getJournal(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async updateJournal(req, res){
        try{
            let requestData = req.body;
            let journalValidation = validationRule.journalValidation
            let {error, value} = journalValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            requestData.id = req.params.id
            let message = await adminModel.updateJournal(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async deleteJournal(req, res){
        try{
            let requestData = {}
            requestData.id = req.params.id
            let message = await adminModel.deleteJournal(requestData)
            return middleware.sendResponse(req, res, message)
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    //Reels Category

    async createReelsCategory(req, res){
        try{
            let requestData = req.body;
            let reelsCategoryValidation = validationRule.reelsCategoryValidation
            let {error, value} = reelsCategoryValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }

            let message = await adminModel.createReelsCategory(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async getReelsCategory(req, res){
        try{
            let requestData = {}
            if(req.params?.id){
                requestData.id = req.params.id
            }
            if(req.params?.search){
                requestData.search = req.params.search
            }
            let message = await adminModel.getReelsCategory(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async updateReelsCategory(req, res){
        try{
            let requestData = req.body;
            let reelsCategoryValidation = validationRule.reelsCategoryValidation
            let {error, value} = reelsCategoryValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            requestData.id = req.params.id
            let message = await adminModel.updateReelsCategory(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async deleteReelsCategory(req, res){
        try{
            let requestData = {}
            requestData.id = req.params.id
            let message = await adminModel.deleteReelsCategory(requestData)
            return middleware.sendResponse(req, res, message)
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async createReels(req, res){
        try{
            let requestData = req.body;
            let reelsValidation = validationRule.reelsValidation
            let {error, value} = reelsValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            let message = await adminModel.createReels(requestData)
            return middleware.sendResponse(req, res, message);

        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async getReels(req, res){
        try{
            let requestData = {}
            if(req.params?.id){
                requestData.id = req.params.id
            }
            if(req.params?.search){
                requestData.search = req.params.search
            }
            let message = await adminModel.getReels(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async updateReels(req, res){
        try{
            let requestData = req.body;
            let reelsValidation = validationRule.reelsValidation
            let {error, value} = reelsValidation.validate(requestData)
            if(error){
                return middleware.sendResponse(req, res, { error: error.details[0].message });
            }
            requestData.id = req.params.id
            let message = await adminModel.updateReels(requestData)
            return middleware.sendResponse(req, res, message);
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});

        }
    }

    async deleteReels(req, res){
        try{
            let requestData = {}
            requestData.id = req.params.id
            let message = await adminModel.deleteReels(requestData)
            return middleware.sendResponse(req, res, message)
        }catch(error){
            return middleware.sendResponse(req, res, { error: error.message || error});
        }
    }

    async getInquiry(req, res){
        try{
            let message = await adminModel.getInquiry()
            return middleware.sendResponse(req, res, message)
        }catch(error){
            console.log("Lund Error :",error)
            return middleware.sendResponse(req, res, { error : error.message || error })
        }
    }
}

module.exports = new AdminController()