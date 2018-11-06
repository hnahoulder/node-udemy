const express = require('express');
const app = express();
const morgan = require('morgan');
// const compression = require('compression');
const {success, error} = require('./function');

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
app.use(express.urlencoded({extended: true}));
const members = [
    {
        id: 1,
        name: 'John'
    },
    {
        id: 2,
        name: 'Julie'
    },
    {
        id: 3,
        name: 'Jack'
    }

];
app.get('/members/:id', (req, res) => {
    // res.send(members[(req.params.id) - 1]);
    // console.log(getIndex(req.params.id));
    const index = getIndex(req.params.id);
    if (Number.isInteger(index)) {
        res.json(success(members[index]));
    } else {
        res.json(error(index));
    }

});
app.get('/members', (req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(members.slice(0, req.query.max));
    } else {

        res.status(200).json(members);
    }
});
app.post('/members', (req, res) => {
    if (req.body.name) {
        let member = {
            id: members.length + 1,
            name: req.body.name
        };
        const index = members.findIndex(el => {
            return el.name === member.name;
        });
        if (index !== -1) {
            res.json(error('name already taken'))
        } else {
            members.push(member);
            res.json(success(member));
        }

    } else {
        res.json(error('No name value'));
    }

})

function getIndex(id) {
    const index = members.findIndex(el => {
        return parseInt(el.id) === parseInt(id);
    });
    if (index === -1) {
        return 'Wrong index';
    } else {
        return index;
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

