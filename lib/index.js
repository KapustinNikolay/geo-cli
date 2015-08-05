/**
 * Created by nikolay on 01.08.15.
 */
exports.savePos = function(point, callback) {
  var clientPos = point.position;
  point.position = {
    type: 'Point',
    coordinates: [clientPos.lng, clientPos.lat]
  };

  db.collection('points').insertOne(point, callback);
};

exports.messages = function(_id, callback) {
  var query = {
    _id : new ObjectId(_id)
  };
  db.collection('points').findOne(query, callback);
};

exports.pushMessage = function(message, callback) {
  var query = {
    _id: new ObjectId(message._id)
  };
  var update = {
    $push: {
      messages: {
        name: message.name,
        message: message.message
      }
    }
  };

  db.collection('points').updateOne(query, update, callback);
};

exports.points = function(coords, callback) {
  var query = {
    position:{
      $nearSphere: {
        $geometry: {
          type: "Point" ,
          coordinates: [
            coords.lng,
            coords.lat
          ]
        },
        $maxDistance: 3000
      }
    }
  };

  var filter = ['theme', 'position'];
  db.collection('points').find(query, filter).toArray(callback);
};