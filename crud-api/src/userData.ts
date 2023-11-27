import { IUser } from "./models"
import mockUsers from "./mockData.json"

const users: IUser[] = []

export function getUsers(): IUser[] {
  return users
}

export function getUserById(userId: string): IUser | undefined {
  return users.find((user) => user.id == userId)
}

export function addUser(newUser: IUser): void {
  users.unshift(newUser)
}

export function deleteUser(userId: string) {
  return users.filter((el) => el.id !== userId)
}

export function updateUser(updatedUser: IUser) {
  return users.map((el) => (el.id === updatedUser.id ? updatedUser : el))
}
