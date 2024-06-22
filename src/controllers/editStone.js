const editRouter = require('express').Router()
const {getStoneById, update} = require('../services/databaseService')
const {validationResult,body} = require('express-validator')
const {isUser} = require('../middlewares/guards')
const {parseError} = require('../config/errorConfig')
editRouter.get('/edit/:id',async (req,res)=>{
    const currentId = req.params.id
    const currentStone = await getStoneById(currentId)
    res.render('editStone',currentStone)
})
editRouter.post('/edit/:id',
    body('name').trim().notEmpty().isLength({ min: 2 }).withMessage('Name is required and must be at least 2 characters long'),
    body('category').trim().notEmpty().isLength({ min: 3 }).withMessage('Category is required and must be at least 3 characters long'),
    body('color').trim().notEmpty().isLength({ min: 2 }).withMessage('Color is required and must be at least 2 characters long'),
    body('image').trim().isLength({ min: 2 }).isURL({ require_tld: false }).withMessage('Image is required and must be at least 2 characters long'),
    body('location').trim().notEmpty().isLength({ min: 5, max: 15 }).withMessage('Location is required and must be at least 5 characters long'),
    body('formula').trim().notEmpty().isLength({ min: 3, max: 30 }).withMessage('Formula is required and must be at least 3 characters long'),
    body('description').trim().notEmpty().isLength({ min: 10 }).withMessage('Description is required and must be at least 10 characters long'),
    isUser(),
    async (req, res) => {
        try {
            console.log(req.body);
            const result = validationResult(req);
            if (result.errors.length) {
                throw result.errors;
            }
            const currentId = req.params.id;
            await update(currentId, req.body, req.user._id);
            res.redirect('/details/' + currentId);
        } catch (err) {
            res.render('editStone', { data: req.body, errors: parseError(err).errors });
            return;
        }
    });


module.exports = {
    editRouter
}