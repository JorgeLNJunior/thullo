import { apiClient } from './api'
import { Card } from './card.service'

export class ListService {
  private api = apiClient

  async create(boardId: string, data: CreateListData): Promise<List> {
    const response = await this.api.post(`/boards/${boardId}/lists`, data)
    return response.data as List
  }

  async cards(listId: string): Promise<Card[]> {
    const response = await this.api.get(`/lists/${listId}/cards`)
    return response.data as Card[]
  }

  async delete(boardId: string, listId: string): Promise<void> {
    await this.api.delete(`/boards/${boardId}/lists/${listId}`)
  }
}

export interface List {
  id: string
  title: string
  position: number
  boardId: string
  createdAt: string
  updatedAt: string
}

interface CreateListData {
  title: string
}
