const axios = require('axios')
const aws = require('aws-sdk')

const MessageHandler = require('../../shared/messages.js')

exports.handler = async (event) => {
    console.log('event', event)

    const data = JSON.parse(event.Records[0].Message)
    console.log('Message', data)

    const libs = {
        axios,
        aws,
    }
    const messageHandler = new MessageHandler(libs)
    await messageHandler.handleChain(data.chain)

    return
}