"use strict";


PhotoGallery.Views.ThumbnailView = Backbone.View.extend({
	template: _.template($('.thumbnail-view-template').text()),

	className: 'thumb',

	events: {
		'click'	: 'showDetailView'
	},

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		$('.thumbnail-gallery').append(this.el);
		this.listenTo(this.model, 'destroy', this.remove)
		this.render();
	},

	render: function () {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

	showDetailView: function () {
		PhotoGallery.views.details = new PhotoGallery.Views.DetailView({model: this.model});
	}
});