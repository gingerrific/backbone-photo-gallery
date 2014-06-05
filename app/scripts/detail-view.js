"use strict";

var DetailView = Backbone.View.extend({
	template: _.template($('.detail-view-template').text()),
	editingTemplate: _.template($('.detail-view-editing-template').text()),

	events: {
		'click .preview-button'			: 'previewChanges',
		'click .save-button'			: 'saveChanges',
		'click .delete-button'			: 'deletePicture',
		'click .new-button'				: 'newPicture'
	},

	initialize: function () {
		this.photoGallery = new PhotoCollection();
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.photoGallery, 'add', function (picture) {
			new ThumbnailView({model:picture});
		});

		$('.details').html('');
		$('.details').append(this.el);
		this.render();
	},

	render: function () {
		console.log('rendered');
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

		if (link && captionText) {
			this.model.set({
				url: link, 
				caption: captionText
			});
			this.photoGallery.add(this.model);
			this.model.save();
		} 
	},

	newPicture: function () {
		var renderedTemplate = this.editingTemplate(this.model.attributes);
		this.$el.html(renderedTemplate);

		this.model = new Photo();

		this.$el.find('input').val('');
		this.$el.find('.zoomed-thumbnail').html('<img src=http://allaboutuarts.ca/wp-content/uploads/2012/07/placeholder.jpg>');

	},

	deletePicture: function () {
		this.model.destroy();
	}
});









var AppView = Backbone.View.extend({

	initialize: function () {
		this.photoGallery = new PhotoCollection();
		this.photoGallery.fetch();
		this.listenTo(this.photoGallery, 'add', function (picture) {
			new ThumbnailView({model:picture});
		});


		this.listenTo(this.photoGallery, 'remove', function (picture) {
			// 
		});

		new DetailView({model: this.model})
	}
})

