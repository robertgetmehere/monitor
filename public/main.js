define('main', [
    'jquery',
    'underscore',
    'backbone',
    'client_app/models/logger.model'
],
    function ($, _,Backbone,Logger) {
        var appView = Backbone.View.extend({
            el: $('#client_root'),
            initialize: function() {
                console.log('initialized');
                this.socket = io.connect('http://localhost:8445');
                this.socket.on('state', function (data) {
                    console.log(data);
                    this.socket.emit('client', { my:data });
                });
                this.log = new Logger();
            }
        });

        return appView;
    });
