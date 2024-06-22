const exphandle = require('express-handlebars')
const express = require ('express')
const cookieParser = require('cookie-parser')
const {session} = require('../middlewares/sessionConfig')
const secret = 'Cookie s3cr3t'
const path = require('path')
function configExpress(app){
    app.use(express.urlencoded({extended:true}))
    app.use(cookieParser(secret))
    app.use(session())
    app.use('/static',express.static('static'))
}

module.exports = {
    configExpress
}