import { apiClient } from './api'
import { Board } from './board.service'

export class UserService {
  private api = apiClient

  async findUserById(id: string): Promise<User> {
    const response = await this.api.get(`/users/${id}`)
    return response.data as User
  }

  async boards(id: string): Promise<Board[]> {
    const response = await this.api.get(`/users/${id}/boards`)
    return response.data as Board[]
  }
}

export interface User {
  id: string
  name: string
  email: string
  profileImage: string
  createAt: string
  updatedAt: string
}
