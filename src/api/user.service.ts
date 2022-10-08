import { apiClient } from './api'

export class UserService {
  private api = apiClient

  async findUserById(id: string): Promise<User> {
    const response = await this.api.get(`/users/${id}`)
    return response.data as User
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
