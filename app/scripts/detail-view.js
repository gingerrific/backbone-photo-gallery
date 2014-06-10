"use strict";

PhotoGallery.Views.DetailView = Backbone.View.extend({
	template: _.template($('.detail-view-template').text()),
	editingTemplate: _.template($('.detail-view-editing-template').text()),
	className: 'detail-container',

	events: {
		'click .preview-button'			: 'previewChanges',
		'click .save-button'			: 'saveChanges',
		'click .delete-button'			: 'deletePicture',
		'click .new-button'				: 'newPicture'
	},

	initialize: function () {
		this.listenTo(this.model, 'change', this.render);

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
		this.$el.find('.zoomed-thumbnail').html("<img src="+link+">");
	},

	saveChanges: function() {
		var link = $('.link-address input').val();
		var captionText = $('.caption-quote input').val();
		var that = this;

		if (link && captionText) {
			this.model.set({
				url: link,
				caption: captionText
			});

			PhotoGallery.collections.photoGallery.add(this.model);
		}
		
		else {
			alert('A URL and caption are required.')
		}
	},

	newPicture: function () {
		var renderedTemplate = this.editingTemplate(this.model.attributes);
		this.$el.html(renderedTemplate);


		this.model = new PhotoGallery.Models.Photo();
		this.$el.find('input').val('');
		this.$el.find('.zoomed-thumbnail').html('<img src=http://allaboutuarts.ca/wp-content/uploads/2012/07/placeholder.jpg>');

	},

	deletePicture: function () {
		this.model.destroy();
	}
});





