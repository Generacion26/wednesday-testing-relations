const request = require("supertest")
const app = require("../app")

const course = {
  name: "programacion",
  credits: 4
}

let courseId

test("POST -> '/api/v1/courses', should return status code 201 and res.body.firstName = student.firstName", async () => {
  const res = await request(app)
    .post('/api/v1/courses')
    .send(course)
  courseId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(course.name)
})


test("Get -> '/api/v1/courses', should return status code 200, and res.body.length === 1", async () => {
  const res = await request(app)
    .get('/api/v1/courses')
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("Get -> '/api/v1/courses/:id', should return status code 200, and res.body.name === course.name", async () => {
  const res = await request(app)
    .get(`/api/v1/courses/${courseId}`)
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(course.name)
})

test("PUT -> '/api/v1/courses/:id', should return status code 200, and res.body.name === courseUpdate.name", async () => {
  const courseUpdate = {
    name: "matematica"
  }

  const res = await request(app)
    .put(`/api/v1/courses/${courseId}`)
    .send(courseUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(courseUpdate.name)
})

test("Delete -> '/api/v1/courses/:id', should return status code 204", async () => {

  const res = await request(app)
    .delete(`/api/v1/courses/${courseId}`)

  expect(res.status).toBe(204)
})