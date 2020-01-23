const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphSch = require('./graphql/schema/index');
const graphRes = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-COntrol-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }

});

app.use(bodyParser.json());

app.use(isAuth);

app.use('/api', graphqlHttp({
    schema: graphSch,
    rootValue: graphRes,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://admin:wowlol123@cluster0-dvwlr.gcp.mongodb.net/events-react-dev?retryWrites=true&w=majority`)
        .then(() => {
            app.listen(8000);
            console.log("**hearing**");
        }).catch(err => {
            console.log(err);
        });


