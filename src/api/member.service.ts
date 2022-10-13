import { User } from './user.service'

export interface Member {
  id: string
  userId: string
  boardId: string
  role: 'ADMIN' | 'MEMBER'
  user: User
  createdAt: string
  updatedAt: string
}
