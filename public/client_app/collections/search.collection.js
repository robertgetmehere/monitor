define([
    'underscore',
    'backbone',
    'client_app/models/search.model'
], function(_, Backbone, SearchModel){
    var Products = Backbone.Collection.extend({
        model:SearchModel,
        url: function() {
            return '/cb/search?search=' + encodeURIComponent(this.searchTerms);
        },
        initialize: function(options) {
            this.searchTerms = options.search;
        },
        parse: function(response) {
            return response;
        }

    });
    return Products;
});
