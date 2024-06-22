const createRouter =require('express').Router()
const {isUser} = require('../middlewares/guards')
const {validationResult,body} = require('express-validator')
const {parseError} = require('../config/errorConfig')
const { create } = require('../services/databaseService')
createRouter.get('/addStone',isUser(),(req,res)=>{
    res.render('addStone')
})
createRouter.post('/addStone',
    body('name').notEmpty().isLength({min:2}).withMessage('Name is required and must be atleast 2 characters long'),
    body('category').notEmpty().isLength({min:3}).withMessage('Category is required and must be atleast 2 characters long'),
    body('color').notEmpty().isLength({min:2}).withMessage('Color is required and must be atleast 2 characters long'),
    body('image').notEmpty().isLength({min:2}).isURL({require_tld:false}).withMessage('Image is required and must be atleast 2 characters long'),
    body('location').notEmpty().isLength({min:5,max:15}).withMessage('Location is required and must be atleast 2 characters long'),
    body('formula').notEmpty().isLength({min:3,max:30}).withMessage('Formula is required and must be atleast 2 characters long'),
    body('description').notEmpty().isLength({min:10}).withMessage('Description is required and must be atleast 2 characters long'),
    isUser(),
async(req,res)=>{
    try{
        const result = validationResult(req)
        if(result.errors.length){
            throw result.errors
        }
        const userId = req.user._id
        const data = req.body
        await create(data,userId)
        res.redirect('/dashboard')
    }catch(err){
        res.render('addStone',{data:req.body,errors:parseError(err).errors})
        return
    }
    
})
module.exports = {
    createRouter
}