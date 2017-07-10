const { buildSchema } = require('graphql')
const igdb = require('../config/igdb')

const schema = buildSchema(`
    type Game {
        id: ID
        name: String
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
        }).then(response => response.body )
    }
}


module.exports.schema = schema
module.exports.root = root
