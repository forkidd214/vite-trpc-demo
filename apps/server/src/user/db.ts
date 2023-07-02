import { User } from './types'
import { randomUUID } from 'crypto'

export const users: User[] = [
  {
    id: randomUUID(),
    name: 'Jason Zou',
  },
  {
    id: randomUUID(),
    name: 'Robin Wieurch',
  },
  {
    id: randomUUID(),
    name: 'Shawn Wong',
  },
]
