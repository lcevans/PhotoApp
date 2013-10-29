//
//= require jquery
//= require jquery_ujs
//= require jquery.serializeJSON.min
//= require_tree ../templates
//= require_tree ./models
//= require_tree .


(function(root) {
  var PT = root.PT = (root.PT || {});

  PT.initialize = function(){
    console.log("initializing");
    PT.Photo.fetchByUserId(CURRENT_USER_ID, PT.showPhotosIndex);
  }

  PT.showPhotosIndex = function () {
    var photosListView = new PT.PhotosListView();
    $('div#content').html(photosListView.render().$el);

    var photoFormView = new PT.PhotoFormView();
    $('div#content').append(photoFormView.render().$el);
  }

  PT.showPhotoDetail = function (photo) {
    var photosDetailView = new PT.PhotosDetailView(photo);
    $('div#content').html(photosDetailView.render().$el);
  }

})(this);