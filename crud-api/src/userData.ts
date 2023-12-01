import { IUser } from "./models"
import { isMultiEnabled } from "./utils/isMultiEnabled"

let users: IUser[] = []

// should be called after each mutation with users if mode --multi
const syncUsers = () => {
  if (isMultiEnabled()) {
    process.send!({ type: "syncUsers", data: users })
  }
}

export function getUsers(): IUser[] {
  return users
}

export function setUsers(newUsers: IUser[]) {
  users = newUsers
}

export function getUserById(userId: string): IUser | undefined {
  return users.find((user) => user.id == userId)
}

export function addUser(newUser: IUser): void {
  users.unshift(newUser)
  syncUsers()
}

export function deleteUser(userId: string) {
  users = users.filter((el) => el.id !== userId)
  syncUsers()
}

export function updateUser(updatedUser: IUser) {
  users = users.map((el) => (el.id === updatedUser.id ? updatedUser : el))
  syncUsers()
}
