const userController = require("../controller/userController")
const userInstance = userController
// const upload = require("../../../../middleware/multer")

const userRoute = (app)=>{
    app.get("/v1/user/tags", userInstance.tags);
    app.get("/v1/user/videos",userInstance.getVideos);
    app.get("/v1/user/process",userInstance.getProcess);
    app.get("/v1/user/reviews",userInstance.getReviews);
    app.get("/v1/user/journal/category",userInstance.getJournalCategory);
    app.get("/v1/user/journal",userInstance.getJournal);
    app.get("/v1/user/reels/category",userInstance.getReelsCategory);
    app.get("/v1/user/reels",userInstance.getReels);
    app.post("/v1/user/createInquiry",userInstance.createContact);

}

module.exports = userRoute