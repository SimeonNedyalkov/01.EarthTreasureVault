const express  =  require('express')
const {configExpress} = require('./config/expressConfig')
const {configHbs} = require('../src/config/hbsConfig')
const {databaseConfig} = require('../src/config/databaseConfig')
const {configRoutes} = require('../src/config/routesConfig')
const { register } = require('./services/userService')
const { createToken } = require('./services/jwt')
const {router} = require('express').Router()
async function start(){
    const app = express()
    const PORT = 3000
    configExpress(app)
    configHbs(app)
    await databaseConfig()
    configRoutes(app)
    app.listen(PORT,console.log(`App running on port: ${PORT}`))
}

start()

