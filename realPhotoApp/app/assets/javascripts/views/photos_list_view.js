(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView = function(){
    this.$el = $("<div></div>");
    PT.Photo.on("add", this.render.bind(this));
    this.$el.on("click", "a", this.showDetail.bind(this) );
  }

  PhotosListView.prototype.render = function(){
    var ul = $("<ul></ul>");
    PT.Photo.all.forEach( function(photo){
      ul.append(
        $("<li></li>").append('<a href="#" data-id="' + photo.get("id") + '">' + photo.get("title") + '</a>')
      )
    });
    this.$el.html(ul);
    return this;
  }

  PhotosListView.prototype.showDetail = function (event) {
    event.preventDefault();

    var id = $(event.target).attr("data-id");

    var photo = PT.Photo.find(id, function (photo) {
      PT.showPhotoDetail(photo);
    });    
  }

})(this);