(function(root) {
  var PT = root.PT = (root.PT || {});

var Photo = PT.Photo = function (attr) {
  this.attr =  _.extend({}, attr);
}

Photo._events = {};
Photo.all = [];

Photo.prototype.get = function (attr_name) {
  return this.attr[attr_name];
}

Photo.prototype.set = function (attr_name, val) {
  this.attr[attr_name] = val;
}

Photo.on = function(eventName, callback){
  Photo._events[eventName] = (Photo._events[eventName] || []);
  Photo._events[eventName].push(callback);
}

Photo.trigger = function(eventName){
  Photo._events[eventName].forEach(function(callback){
    callback();
  });
}

Photo.find = function (id, callback) {
  $.ajax({
    url: "/api/photos/" + id + ".json",
    method: "GET",
    success: function (photo_attr) {
      var foundPhoto = new Photo(photo_attr);
      callback(foundPhoto);
    },
    error: function () {alert("find error");}
  });
}


Photo.prototype.save = function (callback) {
  var that = this;
  if (that.attr.id === undefined) {
    $.ajax({
      url: "/api/photos.json",
      method: "POST",
      data: {attr: that.attr},
      success: function (photo_attr) {
        _.extend(that.attr, photo_attr);
        callback(that);
        Photo.all.push(new Photo(photo_attr));
        Photo.trigger("add");
      },
      error: function () {
        console.log("error");
        alert("saving error");
      }
    });
  }
}

Photo.fetchByUserId = function (userId, callback) {
  console.log("fetching by user");
  $.ajax({
    url: "/api/users/" + userId + "/photos.json",
    method: "GET",
    success: function (photos) {
      var photoObjects = []
      photos.forEach( function (photo) {
        fetchedPhoto = new Photo(photo)
        photoObjects.push(fetchedPhoto);
        if (!_.any(Photo.all, function(storedPhoto){
          return (storedPhoto.id === photo.id)
        })){
          Photo.all.push(fetchedPhoto);
        }
      });
      console.log(Photo.all);
      callback(photoObjects);
    },
    error: function () {alert("fetch error");}
  });
}

})(this);