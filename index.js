const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const routes = require('./routes')
const { schema, root } = require('./graphql')


app.use(bodyParser.json())

app.use('/api', routes)
app.use('/graphql', graphqlHTTP({
    schema: schema, rootValue: root, graphiql: true
}))

const port = 3000
app.listen(port, () => {
    console.log(`Listining on port ${port}`)
})
