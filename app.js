const express = require('express');
const app = express();
const morgan = require('morgan');
const compression  = require('compression');

/*
app.use((req, res, next) =>{
   console.log('URL :' + req.url);
   next()
});
*/
// app.use(compression());
app.use(morgan('common'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const members = [
    {
        id: 1 ,
        name: 'John'
    },
    {
        id: 2 ,
        name: 'Julie'
    },
    {
        id: 3,
        name: 'Jack'
    }

];
app.get('/members/:id', (req, res) => {
    res.send(members[(req.params.id) - 1]);
});
app.get('/members', (req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(members.slice(0, req.query.max));
    } else {

        res.status(200).json(members);
    }
});
app.post('/members', (req, res) => {
    console.log(req.body);
    res.send(req.body.name)
})

function success(result) {
    return {
        status: 'success',
        result
    }
}

function error(message) {
    return {
        status: 'error',
        message
    }
}

/*app.get ('/', (req, res)=>{
    res.send('Home');
});
app.get('/api', (req, res) =>{
    res.send('API')
    });*/
app.listen(8080, () => {
    console.log('Listen to port 8080 ....');
});

