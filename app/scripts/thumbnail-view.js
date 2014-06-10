"use strict";


PhotoGallery.Views.ThumbnailView = Backbone.View.extend({
	template: _.template($('.thumbnail-view-template').text()),

	className: 'thumb',

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
		$('.thumbnail-gallery').append(this.el);
		this.render();
	},

	render: function () {
		if (this.model.isNew()) {
			console.log('waiting on an id')
			this.model.save();
		}
		else {
			var renderedTemplate = this.template(this.model.attributes);
			this.$el.html(renderedTemplate);
		}
	},

	showDetailView: function () {
		PhotoGallery.views.details.remove();
	}
});