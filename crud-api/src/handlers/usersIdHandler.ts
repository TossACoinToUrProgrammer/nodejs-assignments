import { IncomingMessage, ServerResponse } from "http"
import { validate as isValidUuid } from "uuid"

import { parseUrl } from "../utils/parseUrl"
import { deleteUser, getUserById, updateUser } from "../userData"
import { sendResponse } from "../utils/sendResponse"
import { validateUser } from "../utils/validateUser"
import { getRequestBody } from "../utils/getRequestBody"

export const handleUsersIdReq = async (req: IncomingMessage, res: ServerResponse) => {
  const path = parseUrl(req.url)
  const method = req.method
  const userId = path.split("/").pop()

  if (!userId || !isValidUuid(userId)) {
    return sendResponse(res, 400, "Invalid userId")
  }

  const user = getUserById(userId)
  if (!user) {
    return sendResponse(res, 404, "Not Found")
  }

  // ******* GET request *******
  if (method === "GET") {
    return sendResponse(res, 200, JSON.stringify(user))
  }

  // ******* PUT request *******
  if (method === "PUT") {
    const body = await getRequestBody(req)

    const parsedBody = JSON.parse(body)
    const { username, hobbies, age } = parsedBody

    if (!validateUser({ username, hobbies, age })) {
      return sendResponse(res, 400, "Invalid input data")
    }

    const newUser = {
      id: user.id,
      username,
      age,
      hobbies,
    }
    updateUser(newUser)

    return sendResponse(res, 200, JSON.stringify(newUser))
  }

  // ******* DELETE request *******
  if (method === "DELETE") {
    deleteUser(user.id)
    return sendResponse(res, 204, "User deleted")
  }
}
