export interface Card {
  id: string
  title: string
  description: string
  position: number
  listId: string
  createdAt: string
  updatedAt: string
}

export interface CreateCardData {
  title: string
  description?: string
}
