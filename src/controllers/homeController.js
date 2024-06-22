const homeRouter = require('express').Router()
const {getAllStones, getRecent} = require('../services/databaseService')
const {Stone} = require('../models/Stones')
homeRouter.get('/',async (req,res)=>{
    const stones = await getRecent()
    res.render('home',{stones})
})


module.exports = {
    homeRouter
}