"use strict";

var Photo = Backbone.Model.extend({
	idAttribute: '_id',
	defaults: {
		url: '',
		caption: ''
	}
});

var PhotoCollection = Backbone.Collection.extend({
	model: Photo,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/jdphotos'
});