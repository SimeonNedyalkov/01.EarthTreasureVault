const deleteRouter =require('express').Router()
const {isUser} = require('../middlewares/guards')
const {deleteById} = require('../services/databaseService')

deleteRouter.get('/delete/:id',isUser(),async (req,res)=>{
    id = req.params.id
    await deleteById(id,req.user._id)
    res.redirect('/dashboard')
})
module.exports = {deleteRouter}