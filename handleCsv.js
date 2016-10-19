var fs = require('fs');
var csv = require("fast-csv");

module.exports = path => {
  var stream = fs.createReadStream(path);

  var csvStream = csv
    .parse({ objectMode: true, headers: true });

  stream.pipe(csvStream);

  return csvStream;
};