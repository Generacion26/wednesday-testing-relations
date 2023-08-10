const { getAll, create, getOne, remove, update, setStudent } = require('../controllers/course.controller');
const express = require('express');

const routerCourse = express.Router();

routerCourse.route('/')
  .get(getAll)
  .post(create);

routerCourse.route('/:id')
  .get(getOne)
  .delete(remove)
  .put(update);

routerCourse.route('/:id/students')
  .post(setStudent)

module.exports = routerCourse;