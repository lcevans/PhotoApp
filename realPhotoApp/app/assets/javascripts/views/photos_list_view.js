(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView = function(){
    this.$el = $("<div></div>");
    PT.Photo.on("add", this.render.bind(this));
  }

  PhotosListView.prototype.render = function(){
    var ul = $("<ul></ul>");
    PT.Photo.all.forEach( function(photo){
      ul.append(
        $("<li></li>").text(photo.get("title"))
      )
    });
    this.$el.html(ul);
    return this;
  }

})(this);