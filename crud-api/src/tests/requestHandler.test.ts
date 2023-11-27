import http from "http"
import supertest from "supertest"

import { requestHandler } from "../handlers/requestHandler"

const server = http.createServer(requestHandler)
const request = supertest(server)

describe("User Routes", () => {
  test("should get all records with a GET api/users request (an empty array is expected)", async () => {
    const response = await request.get("/api/users")
    expect(response.status).toBe(200)
    expect(JSON.parse(response.text)).toStrictEqual([])
  })

  test("should create new user by a POST api/users request", async () => {
    const newUser = {
      username: "test",
      age: 10,
      hobbies: [],
    }
    const response = await request.post("/api/users").send(newUser)
    const createdUser = JSON.parse(response.text)
    expect(response.status).toBe(201)
    expect(createdUser.username).toBe(newUser.username)
  })

  test("should get created record by its id with a GET api/user/{userId} request", async () => {
    const newUser = {
      username: "test2",
      age: 12,
      hobbies: [],
    }
    const postResponse = await request.post("/api/users").send(newUser)
    expect(postResponse.status).toBe(201)

    const createdUser = JSON.parse(postResponse.text)

    const getResponse = await request.get(`/api/users/${createdUser.id}`)
    expect(getResponse.status).toBe(200)
    expect(JSON.parse(getResponse.text)).toStrictEqual(createdUser)
  })
})
