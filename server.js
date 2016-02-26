var express = require('express'),
    stylus = require('stylus'),
    open = require('open');

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


app.get('*', function(req, res){
    res.render('index');
});

var port = 3000;
app.listen(port);
console.log('http://localhost:'+port);
open('http://localhost:'+port);
