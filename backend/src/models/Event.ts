import { Comment } from './Comment'

export interface Event {
  title: string,
  startTime: string,
  endTime: string,
  gameId: string,
  eventId: string,
  createdAt: string,
  ownerId: string,
  comments: Comment[],
  image?: string
}
