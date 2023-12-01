import { IUser } from "../models"
import { isArrayOfStrings } from "./isArrayOfStrings"

type UserTypeExceptId = Omit<Record<keyof IUser, any>, "id">

export const validateUser = (obj: UserTypeExceptId) => {
  const { username, age, hobbies } = obj
  if (
    !username ||
    typeof username !== "string" ||
    !hobbies ||
    !(hobbies instanceof Array) ||
    !isArrayOfStrings(hobbies) ||
    !age ||
    typeof age !== "number"
  ) {
    return false
  }
  return true
}
