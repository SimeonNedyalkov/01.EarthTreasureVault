const dashboardRouter = require('express').Router()
const {getAllStones} = require('../services/databaseService')

dashboardRouter.get('/dashboard',async(req,res)=>{
    const allStones = await getAllStones()
    res.render('dashboard',{allStones})
})


module.exports = {
    dashboardRouter
}