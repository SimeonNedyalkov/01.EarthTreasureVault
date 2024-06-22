const detailsRouter = require('express').Router()
const {getStoneById} = require('../services/databaseService')
const {like} = require('../services/databaseService')

detailsRouter.get('/details/:id',async (req,res)=>{
    const id = req.params.id
    const stone = await getStoneById(id)
    const userId = req.user?._id
    let isOwner = false
    if(userId == stone.owner){
        isOwner = true
    }
    const hasLiked = Boolean(stone.likedList.find(l=>req.user?._id == l.toString()))
    res.render('details',{stone,isOwner,hasLiked})
})
detailsRouter.get('/like/:id',async (req,res)=>{
    const id = req.params.id
    const stone = await getStoneById(id)
    const userId = req.user?._id
    let isOwner = false
    if(userId == stone.owner){
        isOwner = true
    }
    
    try{
        await like(stone._id,userId)
        res.redirect('/details/'+stone._id)
    }catch(err){
        res.render('/')
    }
})


module.exports = {
    detailsRouter
}