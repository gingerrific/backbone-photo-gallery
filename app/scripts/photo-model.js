"use strict";

PhotoGallery.Models.Photo = Backbone.Model.extend({
	idAttribute: '_id',
	defaults: {
		url: '',
		caption: '',
	}
});

PhotoGallery.Collections.PhotoCollection = Backbone.Collection.extend({
	model: PhotoGallery.Models.Photo,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/jdphotos'
});