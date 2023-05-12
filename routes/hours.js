
var express = require('express');
var router = express.Router();
const stu = require('../model/horas');
/* GET users listing. */
router.get('/', function (req, res, next) {
  stu
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  stu
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// POST un elemento nuevo en la base de datos
router.post('/', (req, res) => {
  const es = new stu(req.body)
  es
    .save()
    .then((data) => res.json(es))
    .catch((error) => res.json({ message: error }));
});
/*
// PUT un elemento nuevo en la base de datos
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { _id, type, brand, price,stock } = req.body
  stu
    .updateOne({ _id: id }, { $set: { type, brand, price,stock } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// PATCH un elemento de la base de datos indicando su id (en este caso solo cambia el nombre)
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const brand = req.body.brand
  stu
    .updateOne({ _id: id }, { $set: { brand } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// DELETE un elemento nuevo en la base de datos
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  stu
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});*/

module.exports = router;