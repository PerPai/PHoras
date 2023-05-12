
var express = require('express');
var router = express.Router();
const usuario = require('../model/usuarios');
/* GET users listing. */
router.get('/', function (req, res, next) {
  usuario
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  usuario
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post('/', (req, res) => {
  const us = new usuario(req.body)
  us
    .save()
    .then((data) => res.json(es))
    .catch((error) => res.json({ message: error }));
});

// DELETE un elemento nuevo en la base de datos
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  usuario
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;