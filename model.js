var mongoose = require('mongoose');

module.exports = function() {

	const schema = mongoose.Schema({
		nome: {
			type: String,
			required: true,
			index: {
				uniqui: true
			}
		},
		idade: {
      type: Number,
      required: true
    },
    sexo: {
      type: String,
			required: true,
    }
	});

	return mongoose.model('Perfil', schema);
}