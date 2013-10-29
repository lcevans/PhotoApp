(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotosDetailView = PT.PhotosDetailView = function(photo){
    this.$el = $("<div></div>");
    this.photo = photo;

    this.$el.on("click","a#back", PT.showPhotosIndex)
  }

  PhotosDetailView.prototype.render = function(){
    var that = this;
    var renderedContent = JST["photo_detail"]({
      url: that.photo.get("url")
    });

    that.$el.html(renderedContent);

    return that;
  }

})(this);