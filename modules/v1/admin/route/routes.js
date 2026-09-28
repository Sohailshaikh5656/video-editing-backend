const adminController = require("../controller/adminController")
const adminInstance = adminController
const upload = require("../../../../middleware/multer")

const adminRoute = (app)=>{
    app.post("/v1/admin/login",adminInstance.login);
    //Upload Any File : 
    app.post("/v1/admin/upload", upload.single("file"), adminController.uploadFile)
    //Tags
    app.post("/v1/admin/tags",adminInstance.createVedioTags);
    app.get("/v1/admin/tags", adminController.tags);
    app.get("/v1/admin/tags/:id", adminController.tags);
    app.get("/v1/admin/tags/search/:search", adminController.tags);
    app.put("/v1/admin/tags/:id", adminController.updateTags);
    app.put("/v1/admin/tags/enable-disable/:id", adminInstance.enableDisableTag);
    app.delete("/v1/admin/tags/:id", adminInstance.deleteTags);
    app.put("/v1/admin/tags/status/:id",adminInstance.changeTagsStatus);
    
    //Vedios
    
    app.post("/v1/admin/videos",adminInstance.createVedios);
    app.get("/v1/admin/videos",adminInstance.getAllVedios);
    app.get("/v1/admin/videos/:id",adminInstance.getAllVedios);
    app.get("/v1/admin/videos/search/:search",adminInstance.getAllVedios);
    app.put("/v1/admin/videos/:id",adminInstance.updateVedios);
    app.delete("/v1/admin/videos/:id",adminInstance.deleteVedios);
    app.put("/v1/admin/videos/status/:id", adminInstance.changeVideoStatus)
    
    //Process
    app.post("/v1/admin/process",adminInstance.createProcess);
    app.get("/v1/admin/process",adminInstance.getProcess);
    app.get("/v1/admin/process/:id",adminInstance.getProcess);
    app.get("/v1/admin/process/search/:search",adminInstance.getProcess);
    app.put("/v1/admin/process/:id",adminInstance.updateProcess);
    app.delete("/v1/admin/process/:id",adminInstance.deleteProcess);
    app.put("/v1/admin/process/status/:id", adminInstance.changesProcessStatus)

    //Testimonial
    
    app.post("/v1/admin/reviews",adminInstance.createReview);
    app.get("/v1/admin/reviews",adminInstance.getReviews);
    app.get("/v1/admin/reviews/:id",adminInstance.getReviews);
    app.get("/v1/admin/reviews/search/:search",adminInstance.getReviews);
    app.put("/v1/admin/reviews/:id",adminInstance.updateReviews);
    app.delete("/v1/admin/reviews/:id",adminInstance.deleteReviews);
    app.put("/v1/admin/reviews/status/:id",adminInstance.changeReviewsStatus);
    
    //Journal Category
    app.post("/v1/admin/journal/category",adminInstance.createJournalCategory);
    app.get("/v1/admin/journal/category",adminInstance.getJournalCategory);
    app.get("/v1/admin/journal/category/:id",adminInstance.getJournalCategory);
    app.get("/v1/admin/journal/category/search/:search",adminInstance.getJournalCategory);
    app.put("/v1/admin/journal/category/:id",adminInstance.updateJournalCategory);
    app.delete("/v1/admin/journal/category/:id",adminInstance.deleteJournalCategory);
    app.put("/v1/admin/journal/category/status/:id",adminInstance.changeJournalCategoryStatus);
    
    //Journal
    app.post("/v1/admin/journal",adminInstance.createJournal);
    app.get("/v1/admin/journal",adminInstance.getJournal);
    app.get("/v1/admin/journal/:id",adminInstance.getJournal);
    app.get("/v1/admin/journal/search/:search",adminInstance.getJournal);
    app.put("/v1/admin/journal/:id",adminInstance.updateJournal);
    app.delete("/v1/admin/journal/:id",adminInstance.deleteJournal);
    app.put("/v1/admin/journal/status/:id",adminInstance.changeJournalStatus);
    
    //Reels Category
    app.post("/v1/admin/reels/category",adminInstance.createReelsCategory);
    app.get("/v1/admin/reels/category",adminInstance.getReelsCategory);
    app.get("/v1/admin/reels/category/:id",adminInstance.getReelsCategory);
    app.get("/v1/admin/reels/category/search/:search",adminInstance.getReelsCategory);
    app.put("/v1/admin/reels/category/:id",adminInstance.updateReelsCategory);
    app.delete("/v1/admin/reels/category/:id",adminInstance.deleteReelsCategory);
    app.put("/v1/admin/reels/category/status/:id",adminInstance.changeReelsCategoryStatus);

    //Reels
    app.post("/v1/admin/reels",adminInstance.createReels);
    app.get("/v1/admin/reels",adminInstance.getReels);
    app.get("/v1/admin/reels/:id",adminInstance.getReels);
    app.get("/v1/admin/reels/search/:search",adminInstance.getReels);
    app.put("/v1/admin/reels/:id",adminInstance.updateReels);
    app.delete("/v1/admin/reels/:id",adminInstance.deleteReels);
    app.put("/v1/admin/reels/status/:id",adminInstance.changeReelsStatus);

    //Brands
    app.post("/v1/admin/brand",adminInstance.createBrand);
    app.get("/v1/admin/brand",adminInstance.getBrands);
    app.get("/v1/admin/brand/:id",adminInstance.getBrands);
    app.get("/v1/admin/brand/search/:search",adminInstance.getBrands);
    app.put("/v1/admin/brand/:id",adminInstance.updateBrand);
    app.delete("/v1/admin/brand/:id",adminInstance.deleteBrand);
    app.put("/v1/admin/brand/status/:id",adminInstance.changeBrandStatus);

    app.get("/v1/admin/inquiry",adminInstance.getInquiry);

}

module.exports = adminRoute
