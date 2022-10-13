import { apiClient } from './api'
import { Member } from './member.service'

export class BoardService {
  private api = apiClient

  async create(data: CreateBoardData): Promise<Board> {
    const response = await this.api.post('/boards', data)
    return response.data as Board
  }

  async members(boardId: string, query: MemberQuery): Promise<Member[]> {
    const response = await this.api.get(`/boards/${boardId}/members`, {
      params: query
    })
    return response.data as Member[]
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

export interface MemberQuery {
  role?: 'ADMIN' | 'MEMBER'
  take?: number
  skip?: number
}
