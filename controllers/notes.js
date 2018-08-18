// Controller for our Notes

var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {
  get: function (data, cb) {
    Note.find({
      _headline: data._id
    }, cb);
  },
  save: function (data, cb) {
    var newNote = {
      _headline: data._id,
      date: makeDate(),
      noteText: date.noteText
    };
    Note.create(newNote, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        cb(doc);
      }
    });
  },
  delete: function (data, cb) {
    Note.remove({
      _id: data._id
    }, cb);
  }
};