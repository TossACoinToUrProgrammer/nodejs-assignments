export interface IUser {
  id: string
  username: string
  age: number
  hobbies: string[]
}

export interface WorkerMessage {
  type: string,
  data: any
}