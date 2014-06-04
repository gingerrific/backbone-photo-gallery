"use strict";


var ThumbnailView = Backbone.View.extend({
	template: _.template($('.thumbnail-view-template').text()),

	className: 'thumb',

	events: {
		'click'	: 'showDetailView'
	},

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		$('.thumbnail-gallery').append(this.el);
		this.render();
	},

	render: function () {
		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

	showDetailView: function () {
		var detailed = new DetailView({model: this.model});
	}
});