const qs = require('querystring')

const urls = {
    callback: 'https://jvb-exodia-server.herokuapp.com/callback',
    playing: 'https://api.spotify.com/v1/me/player/currently-playing',
    token: 'https://accounts.spotify.com/api/token',
}

class Spotify {
    axios = null

    constructor(axios) {
        this.axios = axios
    }

    async sendCurrentPlaying() {
        const r = await this.getCurrentPlaying()
        if(!r) return console.warn('no song playing: exit')
        await this.axios({
            method: 'post',
            url: urls.callback,
            data: r
        })
    }

    async getCurrentPlaying() {
        try {
            const token = await this.refreshAuth()
            const r = await this.axios({
                method: 'get',
                url: urls.playing,
                headers: { Authorization: `Bearer ${token}` }
            })

            return r.data && {
                song: r.data.item.name,
                artists: r.data.item.artists.map(a => a.name).join(', ')
            }
        } catch (e) {
            if(e.isAxiosError) console.error(e.response.status, e.response.data)
            else console.error(e)
            return null
        }
    }

    async refreshAuth() {
        const params = {
            method: 'post',
            url: urls.token,
            data: qs.stringify({
                grant_type: 'refresh_token',
                refresh_token: process.env.Spotify_Refresh,
                client_id: process.env.Spotify_Id
            }),
            headers: {
                Authorization: `Basic ${process.env.Spotify_BasicAuth}`,
                ContentType: 'application/x-www-form-urlencoded'
            }
        }
        const r = await this.axios(params)
        return r.data.access_token
    }
}

module.exports = Spotify