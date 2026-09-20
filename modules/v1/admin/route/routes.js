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
    
    //Vedios
    
    app.post("/v1/admin/vedios",adminInstance.createVedios);
    app.get("/v1/admin/vedios",adminInstance.getAllVedios);
    app.get("/v1/admin/vedios/:id",adminInstance.getAllVedios);
    app.get("/v1/admin/vedios/search/:search",adminInstance.getAllVedios);
    app.put("/v1/admin/vedios/:id",adminInstance.updateVedios);
    app.delete("/v1/admin/vedios/:id",adminInstance.deleteVedios);

    //Process
    app.post("/v1/admin/process",adminInstance.createProcess);
    app.get("/v1/admin/process",adminInstance.getProcess);
    app.get("/v1/admin/process/:id",adminInstance.getProcess);
    app.get("/v1/admin/process/search/:search",adminInstance.getProcess);
    app.put("/v1/admin/process/:id",adminInstance.updateProcess);
    app.delete("/v1/admin/process/:id",adminInstance.deleteProcess);

    //Testimonial
    
    app.post("/v1/admin/reviews",adminInstance.createReview);
    app.get("/v1/admin/reviews",adminInstance.getReviews);
    app.get("/v1/admin/reviews/:id",adminInstance.getReviews);
    app.get("/v1/admin/reviews/search/:search",adminInstance.getReviews);
    app.put("/v1/admin/reviews/:id",adminInstance.updateReviews);
    app.delete("/v1/admin/reviews/:id",adminInstance.deleteReviews);

}

module.exports = adminRoute