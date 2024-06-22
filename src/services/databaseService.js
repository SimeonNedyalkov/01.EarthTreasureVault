const {Stone} = require('../models/Stones')

async function getAllStones(){
    return Stone.find().lean()
}

async function getRecent(){
    return Stone.find().sort({$natural:-1}).limit(3).lean()
}

async function getStoneById(id){
    return Stone.findById(id).lean()
}

async function create(data,authorId){
    const record = new Stone({
        name : data.name,
        category:data.category,
        color:data.color,
        image:data.image,
        location:data.location,
        formula:data.formula,
        description:data.description,
        likedList:data.likedList,
        owner:authorId
    })
    await record.save()
    return record
}

async function like(stoneId,userId){
    const record = await Stone.findById(stoneId)
    if(!record){
        throw new Error('Stone not found')
    }
    if(record.owner.toString() == userId){
        throw new Error('Access denied!')
    }
    if(record.likedList.find(l=>l.toString() == userId)){
        return
    }
    
    record.likedList.push(userId)
    
    await record.save()
    return record
}

async function update(stoneId, data , authorId){
    const record = await Stone.findById(stoneId)
    if(!record){
        throw new Error('Stone not found')
    }
    if(record.owner.toString() != authorId){
        throw new Error('Access denied!')
    }
    
    record.name = data.name
    record.category = data. category
    record.color = data.color
    record.image = data.image
    record.location = data.location
    record.formula = data.formula
    record.description = data.description
    record.likedList = data.likedList
    record.owner = authorId
    
    await record.save()
    return record
}

async function deleteById(id,userId){
    const record = await Stone.findById(id)
    if(!record){
        throw new ReferenceError(`Record not found ` + id)
    }
    if(record.owner.toString() != userId){
        throw new Error('Access denied')
    }
    await Stone.findByIdAndDelete(id)
}

module.exports = {
    getAllStones,
    getStoneById,
    create,
    update,
    deleteById,
    getRecent,
    like
}