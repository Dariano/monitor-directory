var chokidar = require('chokidar');
var handleCsv = require('./handleCsv');


var watcher = chokidar.watch('./files/', {
  ignored: /[\/\\]\./, persistent: true
});

watcher
  .on('add', path => {
    handleCsv(path)
      .on("data", function (data) {
        console.log('Salva no banco de dados.')
        console.log(data);
      })
      .on("end", function () {
        console.log("move arquivo para outro diretório.");
      });
  });