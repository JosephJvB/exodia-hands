require('dotenv').config({
    path: require('path').join(__dirname, '../../.env')
})

const S = require('../../shared/spotify')
const s = new S(require('axios'))

s.getCurrentPlaying().then(console.log).then(() => {
    return new Promise((r) => setTimeout(r, 1))
})
.then(_ => s.getCurrentPlaying()).then(console.log)