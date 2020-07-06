const Spotify = require('./spotify')

class Messages {
    spotify = null
    awsSns = null

    constructor(libs) {
        this.spotify = new Spotify(libs.axios)
        this.awsSns = new libs.aws.SNS({ region: 'ap-southeast-2' })
    }

    handleChain(chain) {
        if(chain.length > 0) {
            return this[chain[0]](chain.slice(1))
        } else {
            return this.spotify.sendCurrentPlaying()
        }
    }

    aws(chain) {
        return new Promise((resolve, reject) => {
            const params = {
                Message: JSON.stringify({chain}),
                Subject: '',
                TopicArn: process.env.AWS_Topic
            }
            this.client.publish(params, (err, _) => {
                if(err) reject(err)
                else resolve()
            })
        })
    }
    google(chain) {}
    azure(chain) {}
}

module.exports = Messages