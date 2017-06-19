const express = require('express');
const app = express();

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.set('port', (process.env.PORT || 3000));


const db = require('./models');


db.conn.once('open', function() {

    // set up routes
    const router = require('./router');
    router(app, db, __dirname);

    
    app.listen(app.get('port'), function () {
        console.log('Server - listening on port '+app.get('port'));
        console.log('Server - IDLE - waiting for the first connection');
        console.log('================================================');
    });
});