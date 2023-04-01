var Sequence = require('../models/sequence');


var maxBookId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence
    .findOne()
    .exec()
    .then(
      (sequence) => {
        console.log("sequence = " + sequence)
        sequenceId = sequence._id;
        maxBookId = sequence.maxBookId;
      },
      (err) => {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
    )
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'books':
      maxBookId++;
      updateObject = {maxBookId: maxBookId};
      nextId = maxBookId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject});

  return nextId;
}

module.exports = new SequenceGenerator();
