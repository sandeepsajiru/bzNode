var express = require('express'),
    stylus = require('stylus'),
    open = require('open'),
    bodyParser = require('body-parser');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname+'/server/views');

// STYLUS CONFIG
function compile(str, path){
    return stylus(str).set('filename', path);
}
app.use(express.static(__dirname+'/public'));
app.use(stylus.middleware(
    {
        src: __dirname+'/public',
        compile:compile
    }
));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/partials/:partialPath', function(req, res) {
    console.log('partial requested '+req.params.partialPath);
    res.render('partials/' + req.params.partialPath);
});


app.get('/', function(req, res){
    console.log('main page requested');
    res.render('index');
});

var port = 3000;
app.listen(port);
console.log('http://localhost:'+port);
open('http://localhost:'+port);
