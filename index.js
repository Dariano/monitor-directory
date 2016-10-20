var chokidar = require('chokidar');
var handleCsv = require('./handleCsv');
var fs = require("fs-extra");

var config = require('./config/config')();
require('./config/database.js')(config.db);

var Model = require('./model')();

var watcher = chokidar.watch('./files/', {
  ignored: /[\/\\]\./, persistent: true
});

watcher
  .on('add', escutaEvento);

function escutaEvento(path) {
  handleCsv(path)
    .on("data", salva)
    .on("end", removeArquivo(path));
}

function salva(dados) {
  Model
    .create(dados)
    .then(res => console.log(res))
    .catch(erro => console.log(erro));
}

function removeArquivo(path) {
  return () => {
    fs.move(path,'old-' + path, { clobber: true}, () => fs.remove(path));
  };
}