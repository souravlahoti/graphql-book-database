const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const cors = require('cors')

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8080, (err, req, res) => {
    console.log('listening to port 8080')
});