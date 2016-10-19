var chokidar = require('chokidar');
var handleCsv = require('./handleCsv');

var config = require('./config/config')();
require('./config/database.js')(config.db);

var Model = require('./model')();

console.log(Model);

var watcher = chokidar.watch('./files/', {
  ignored: /[\/\\]\./, persistent: true
});

watcher
  .on('add', path => {
    handleCsv(path)
      .on("data", function (data) {
        console.log('Salva no banco de dados.');
        Model
          .create(data)
          .then(res => console.log(res))
          .catch(erro => console.log(erro));
      })
      .on("end", function () {
        console.log("move arquivo para outro diretório.");
      });
  });