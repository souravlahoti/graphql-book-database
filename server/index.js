const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8080, (err, req, res) => {
    console.log('listening to port 8080')
});