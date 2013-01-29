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
            events: {
                'click #btnSearch' : 'doSearch'
            },
            initialize: function() {
                console.log('initialized');
                this.log = new Logger();

            },
            doSearch: function() {
                this.search = new SearchCollection({search: $('#searchTerm').val()});
                this.search.bind('reset',this.procSearch,this);
                this.search.fetch();
                console.log($('#searchTerm').val());
            },
            procSearch: function() {
                if (this.search.length > 0) {
                    JSON.stringify(this.search);
                }
            }
        });

        return appView;
    });
