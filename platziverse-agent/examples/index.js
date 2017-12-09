'use strict'

const PlatziverseAgent = require('../')

const agent = new PlatziverseAgent({
  name: 'myapp',
  username: 'admin',
  interval: 2000
})

agent.addMetric('rss', function getRss () {
  return process.memoryUsage().rss
})

agent.addMetric('promiseMetric', function getRandomPromise () {
  return Promise.resolve(Math.random())
})

agent.addMetric('callbackMetric', function getRandomCallBack (callback) {
  setTimeout(() => {
    callback(null, Math.random())
  }, 1000)
})

 agent.connect()

// // This agent only
agent.on('connected', handler)
agent.on('disconnected', handler)
agent.on('message', handler)

// Other Agents
// agent.on('agent/connected')
// agent.on('agent/disconnected')
// agent.on('agent/message')

function handler (payload) {
  console.log(payload)
}

setTimeout(() => agent.disconnect(), 10000)
