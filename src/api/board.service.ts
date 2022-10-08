import { apiClient } from './api'

export class BoardService {
  private api = apiClient

  async create(data: CreateBoardData): Promise<Board> {
    const response = await this.api.post('/boards', data)
    return response.data as Board
  }
}

export interface CreateBoardData {
  title: string
  description: string
}

export interface Board {
  id: string
  title: string
  description: string
  coverImage: string
  ownerId: string
  createdAt: string
  updatedAt: string
}
