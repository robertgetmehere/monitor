(function() {

    var express = require('express')
        ,app = express(
            express.cookieParser()
            ,express.session({ secret: 'mWvjLAEW84uQLH14', maxAge: 86400000 })
        );
    var server = require('http').createServer(app)
        , io = require('socket.io').listen(server);

    server.listen(8445);

    io.sockets.on('connection', function (socket) {
        socket.emit('state', { status: 'connected to socket on port 80' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });

    require('nodetime').profile({
        accountKey: '175703d3a950b4064cadf0a5cfe844ce2e875c5d',
        reportingServer: 'console',
        debug: true,
        //stdout: true,
        appService: 'Test Service',
        appName: 'Test Server'

    });

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

    app.listen(8445);

    console.log("Express server listening on port %d", 8445);

}).call(this);
