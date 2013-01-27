define([
    'underscore',
    'backbone'
], function(_,Backbone){
    var Logger = Backbone.Model.extend({
        url: window.location.href + '/logging'
    });
    return Logger;
});
