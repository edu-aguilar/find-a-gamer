import { Comment } from './Comment'

export interface Event {
  title: string,
  description: string,
  startTime: string,
  endTime: string,
  gameId: string,
  eventId: string,
  createdAt: string,
  ownerId: string,
  comments: Comment[],
  image?: string
}
