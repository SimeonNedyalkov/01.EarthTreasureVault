const {  dashboardRouter } = require('../controllers/dashboardController')
const {homeRouter} = require('../controllers/homeController')
const { searchRouter} = require('../controllers/searchController')
const { userRouter } = require('../controllers/userController')
const { createRouter } = require('../controllers/createController')
const { detailsRouter } = require('../controllers/detailsController')
const { editRouter } = require('../controllers/editStone')
const { deleteRouter } = require('../controllers/deleteController')
function configRoutes(app){
    app.use(homeRouter,)
    app.use(dashboardRouter)
    app.use(searchRouter)

    // users
    app.use(userRouter)
    // create stone
    app.use(createRouter)
    // details
    app.use(detailsRouter)
    //dashboard
    app.use(dashboardRouter)
    // edit
    app.use(editRouter)
    // delete
    app.use(deleteRouter)
    
}
module.exports = {
    configRoutes
}