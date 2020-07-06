const axios = require('axios')
const aws = require('aws-sdk')

const MessageHandler = require('../../shared/messages.js')

exports.handler = async (event) => {
    console.log('event', event)
    
    // JSON.parse(event.data) ?
    const data = {chain: []}
    console.log('message', data)

    const libs = {
        axios,
        aws,
    }
    const messageHandler = new MessageHandler(libs)
    await messageHandler.handleChain(data.chain)

    return
}