define('main', [
    'jquery',
    'underscore',
    'backbone',
    'client_app/models/logger.model',
    'client_app/collections/search.collection'
],
    function ($, _,Backbone,Logger,SearchCollection) {
        var appView = Backbone.View.extend({
            el: $('#client_root'),
            initialize: function() {
                console.log('initialized');
                this.log = new Logger();
                this.search = new SearchCollection({search: 'square'});
                this.search.bind('reset',this.procSearch,this);
                this.search.fetch();
            },
            procSearch: function() {

            }
        });

        return appView;
    });
