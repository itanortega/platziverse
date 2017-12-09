'use strict'

const debug = require('debug')('platziverse:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('platziverse-db')

const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const config = {
  database: process.env.DB_NAME || 'node',
  username: process.env.DB_USER || 'usu_pg',
  password: process.env.DB_PASS || '123456',
  host: process.env.DB_HOST || '181.62.161.249',
  dialect: 'postgres',
  logging: s => debug(s)
}

const server = new mosca.Server(settings)


let Agent, Metric

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
})

server.on('clientConnected', client => {
  debug(`Client Disconnected: ${client.id}`)
})

server.on('published', (packet, client) => {
  debug(`Received: ${packet.topic}`)
  debug(`Payload: ${packet.payload}`)
})

server.on('ready', async ()=>{
  const services = await db(config).catch(handleFatalError)
  Agent = services.Agent
  Metric = services.Metric
  console.log(`${chalk.green('[platziverse-mqtt]')} server is running`)
})

server.on('error', handleFatalError)

function handleFatalError(err){
  console.error(`${chalk.red('fatal error')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)