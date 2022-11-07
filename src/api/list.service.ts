import { apiClient } from './api'
import { Card, CreateCardData } from './card.service'

export class ListService {
  private api = apiClient

  /**
   * Create a new board.
   * @param boardId The id of the board.
   * @param data The board data.
   */
  async create(boardId: string, data: CreateListData): Promise<List> {
    const response = await this.api.post(`/boards/${boardId}/lists`, data)
    return response.data as List
  }

  /**
   * Create a new card.
   * @param listId The id of the list.
   * @param data The data to create a card.
   */
  async createCard(listId: string, data: CreateCardData): Promise<Card> {
    const response = await this.api.post(`/lists/${listId}/cards`, data)
    return response.data as Card
  }

  /**
   * Get all list cards.
   * @param listId The id of the list.
   */
  async cards(listId: string): Promise<Card[]> {
    const response = await this.api.get(`/lists/${listId}/cards`)
    return response.data as Card[]
  }

  /**
   * Update a list data.
   * @param boardId The id of the board.
   * @param listId The id of the list.
   * @param data The data to be updated.
   */
  async update(
    boardId: string,
    listId: string,
    data?: UpdateListData
  ): Promise<void> {
    await this.api.patch(`/boards/${boardId}/lists/${listId}`, data)
  }

  /**
   * Delete a list.
   * @param boardId The id of the board.
   * @param listId The id of the list.
   */
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

export interface UpdateListData {
  title?: string
  position?: string
}

interface CreateListData {
  title: string
}
