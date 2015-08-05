/**
 * Created by nikolay on 29.07.15.
 */
var model = {
  items: ko.observableArray(),
  theme: ko.observable(),
  _id: ko.observable(),
  message: ko.observable(),
  submit: function(a, e) {
    var message = this.message();

    var msg = {
      _id: this._id(),
      name: localStorage.name,
      message: message
    };

    network.pushMessage(msg, function(result) {
    });

    this.message('');
  }
};
