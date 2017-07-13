const { buildSchema } = require('graphql')
const igdb = require('../config/igdb')
const { getPage } = require('./util')


const schema = buildSchema(`
    type Game {
        id: ID
        name: String,
        rating: Float
    }

    type Query {
      game: [Game]
    }
`)

var root = {
    game: () => {
        return igdb.games({
            fields: '*',
            search: 'last',
            limit: '10'
        })
            .then(response => response.body)
    }
}

class Game {
    rating() {
        return getPage('http://me.ign.com/ar/article/review/')
            .then($ => $('#content > ul.tbl > li').map( (i, li) => this.rating = $('span', li).text() ) )
    }
}

const getPage = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (err, response, body) => {
            if(err) {
                return reject(err)
            } else {
                return resolve(cheerio.load(body))
            }
        })
    })
}


module.exports.schema = schema
module.exports.root = root
