import { IncomingMessage, ServerResponse } from "http"
import { v4 as uuidv4 } from "uuid"

import { addUser, getUsers } from "../userData"
import { sendResponse } from "../utils/sendResponse"
import { validateUser } from "../utils/validateUser"
import { getRequestBody } from "../utils/getRequestBody"

export const handleUsersReq = async (req: IncomingMessage, res: ServerResponse) => {
  const method = req.method

  if (method === "GET") {
    return sendResponse(res, 200, JSON.stringify(getUsers()))
  }

  if (method === "POST") {
    const body = await getRequestBody(req)
    
    const parsedBody = JSON.parse(body)
    const { username, hobbies, age } = parsedBody

    if (!validateUser({ username, hobbies, age })) {
      return sendResponse(res, 400, "Invalid input data")
    }

    const newUser = {
      id: uuidv4(),
      username,
      age,
      hobbies,
    }
    addUser(newUser)

    return sendResponse(res, 201, JSON.stringify(newUser))
  }
}
