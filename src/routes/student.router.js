const { getAll, create, getOne, remove, update, setCourses } = require('../controllers/student.controller');
const express = require('express');

const routerStudent = express.Router();

routerStudent.route('/')
  .get(getAll)
  .post(create);

routerStudent.route('/:id')
  .get(getOne)
  .delete(remove)
  .put(update);


routerStudent.route('/:id/courses')
  .post(setCourses)


module.exports = routerStudent;