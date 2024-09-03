const searchRouter = require('express').Router()
const {getAllStones} = require('../services/databaseService')

searchRouter.get('/search',async (req,res)=>{
    const stones = await getAllStones()
    res.render('search',{stones})
})
searchRouter.post('/search', async (req, res) => {
    const searchQuery = req.body.search;
    console.log(searchQuery)
    const stones = await getAllStones(searchQuery);
    const currentStone = stones.find(l=>req.body.search.toLowerCase() == l.name.toLocaleLowerCase())
    console.log(currentStone)
    if(currentStone){
        res.redirect('/details/'+currentStone._id)
    }else{
        res.render('search', { stones });
    }
});

// Handle GET requests for /search/:id

module.exports = {
    searchRouter
}