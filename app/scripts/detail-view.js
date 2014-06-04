"use strict";

var DetailView = Backbone.View.extend({
	template: _.template($('.detail-view-template').text()),
	editingTemplate: _.template($('.detail-view-editing-template').text()),

	events: {
		'click .preview-caption-button'	: 'previewChanges',
		'click .save-button'			: 'saveChanges'
	},

	initialize: function () {
		this.photoGallery = new PhotoCollection();
		this.photoGallery.fetch();
		this.listenTo(this.photoGallery, 'add', function (picture) {
			new ThumbnailView({model:picture});
		});

		$('.details').html('');
		$('.details').append(this.el);
		this.render();
	},

	render: function () {

		var renderedTemplate = this.template(this.model.attributes);
		this.$el.html(renderedTemplate);
	},

	previewChanges: function () {
		var link = $('.link-address input').val();
		var captionText = $('.caption-quote input').val();
		if (link && captionText) {
			this.photoGallery.add({url: link, caption: captionText});
			this.render;
		}
	},

	saveChanges: function() {
		var link = $('.link-address input').val();
		var captionText = $('.caption-quote input').val();
		if (link && captionText) {
			this.photoGallery.add({url: link, caption: captionText}).save();
		}
		$('.link-address input').val('');
		$('.caption-quote input').val('');
	}
});

var blankPhoto = new Photo();
new DetailView({model: blankPhoto});