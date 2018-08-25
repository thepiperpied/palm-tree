const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphql = require('graphql');

const app = express();

app.use('/graphql', graphqlHTTP({

}));

app.listen(5000, () => {
    console.log("Running the server at port 5000");
});