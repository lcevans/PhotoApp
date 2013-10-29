(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoFormView = PT.PhotoFormView = function () {
    this.$el = $("<div></div>");
    this.$el.on("submit", this.submit.bind(this));

  }

  PhotoFormView.prototype.render = function () {

    var renderedContent = JST["photo_form"];

    this.$el.html(renderedContent);
    return this
  }

  PhotoFormView.prototype.submit = function (event) {
    event.preventDefault();
    var params = $(event.target).serializeJSON();
    var newPhoto = new PT.Photo(params["photo"]);
    newPhoto.save(function () {});
  }

})(this);