(function() {

    var express = require('express')
        ,request = require('request')
        ,app = express(
            express.cookieParser()
            ,express.session({ secret: 'yousessionkeyhere', maxAge: 86400000 })
        );
    var server = require('http').createServer(app)
        , io = require('socket.io').listen(server)
        , url = require('url')
        , cbKey = 'yourkeyhere'; //PLEASE GET YOUR OWN KEY


    app.set("view options", {layout:false});
    app.use(express.static(__dirname + '/public'));

    app.configure(function () {
        app.use(express.bodyParser());
        app.use(express.methodOverride());
    });

    app.use(function(err, req, res, next){
        res.send(500, { error: 'Sorry something bad happened! ' + err.message });
    });

    app.get('/', function (req, res) {
        res.render("index.html");
    });

    app.get('/cb/search',function(req,res) {

        var urlObj = url.parse(req.url,true);

        request(
            {
                url : 'http://api.crunchbase.com/v/1/search.js'
                ,qs : {
                        api_key     :   cbKey
                        ,query      :   urlObj.query['search']
                      }
            },function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                res.send(body);
            } else {
                res.send({error: 'something happened'});
            }
        });
    });
    app.get('/cb/people',function(req,res){
        res.send();

    });
    app.get('/cb/companies',function(req,res){
        res.send();
    });

    app.listen(8445);

    console.log("Express server listening on port %d", 8445);

}).call(this);
