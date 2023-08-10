const app = require("../app")
const request = require('supertest')
const Course = require("../models/Course")

require("../models")

const student = {
  firstName: "Gabriel",
  lastName: "Martinez",
  birthday: "2020-09-12",
  program: "ingenieria"
}

let studentId

test("POST -> '/api/v1/students', should return status code 201 and res.body.firstName = student.firstName", async () => {
  const res = await request(app)
    .post('/api/v1/students')
    .send(student)
  studentId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(student.firstName)
})

test("Get -> '/api/v1/students', should return status code 200, and res.body.length === 1", async () => {
  const res = await request(app)
    .get('/api/v1/students')



  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].courses).toBeDefined() //✅
  expect(res.body[0].courses).toHaveLength(0) //✅

})

test("Get -> '/api/v1/students/:id', should return status code 200, and res.body.firstName === student.firstName", async () => {
  const res = await request(app)
    .get(`/api/v1/students/${studentId}`)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(student.firstName)
})

test("PUT -> '/api/v1/students/:id', should return status code 200, and res.body.firstName === studentUpdate.firstName", async () => {
  const studentUpdate = {
    firstName: "Javier"
  }

  const res = await request(app)
    .put(`/api/v1/students/${studentId}`)
    .send(studentUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(studentUpdate.firstName)
})


test("POST -> '/api/v1/students/:id/courses', should return status code 200 and res.body.length === 1 ", async () => {
  const course = {
    name: "programacion",
    credits: 4
  }

  const createCourse = await Course.create(course)

  const res = await request(app)
    .post(`/api/v1/students/${studentId}/courses`)
    .send([createCourse.id])

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(createCourse.id)

  await createCourse.destroy()

})





test("Delete -> '/api/v1/students/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`/api/v1/students/${studentId}`)

  expect(res.status).toBe(204)
})