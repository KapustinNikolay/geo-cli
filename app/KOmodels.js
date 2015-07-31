/**
 * Created by nikolay on 29.07.15.
 */
var model = {
  items: ko.observableArray(),
  theme: ko.observable(),
  markerId: null,
  message: ko.observable(),
  submit: function(e) {
    var markerId = e.markerId;
    var message = e.message();

    var msg = {
      name:'HUY',
      message: message
    };

    storage[markerId].messages.push(msg);
    model.items.push(msg);
    e.message('');
  }
};
