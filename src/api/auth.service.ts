import { apiClient } from './api'

export class AuthService {
  private api = apiClient

  async refresh(refresh_token: string): Promise<string> {
    const response = await this.api.post('/auth/refresh', { refresh_token })
    return response.data.access_token
  }
}

export type AccessToken = {
  user_id: string
  iat: number
  exp: number
}
