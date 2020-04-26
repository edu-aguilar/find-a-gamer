import { v4 as generateRandomUUID } from 'uuid'

import { Event } from './../models/Event'
import { Comment } from '../models/Comment'
import { CreateEventRequest } from '../requests/createEventRequest'
import { EventsAccess } from '../datalayer/eventsAccess'
import { CreateEventCommentRequest } from '../requests/createEventCommentRequest'
import { UpdateEventRequest } from '../requests/updateEventRequest'
import { generateSignedUrl } from '../datalayer/s3Access'

const eventsAccess = new EventsAccess()

export async function createEvent(event: CreateEventRequest, ownerId: string) {

	// TODO: 
	// 	- check gameId exists,
	// 	- check hours are correctly (endTime is after startTime)

	const newEvent: Event = {
    ...event,
    eventId: generateRandomUUID(),
		createdAt: new Date().toISOString(),
    ownerId,
		comments: []
  };

  return eventsAccess.createEvent(newEvent);
}

export async function getEvents(queryParams: any = {}) {

  if (queryParams.gameId) {
    return eventsAccess.getEventsByGameId(queryParams.gameId)
  } else {
    Promise.reject('operation not allowed')
    // maybe use here .scan with pagination ????
  }
}

export async function getEventsByOwnerId(ownerId: string) {

  return eventsAccess.getEventsByOwnerId(ownerId)
}

export async function addCommentToEvent(newEventCommentReq: CreateEventCommentRequest, userId: string, eventId: string) {

  const newComment: Comment = {
    ...newEventCommentReq,
    userId,
    createdAt: new Date().toISOString()
  }
  const event = await eventsAccess.getEventById(eventId)

  return eventsAccess.addCommentToEvent(newComment, eventId, event.ownerId)
}

export async function updateEvent(eventId: string, ownerId: string, updateEventReq: UpdateEventRequest) {

  // TODO: validate dates here!!
  return eventsAccess.updateEvent(eventId, ownerId, updateEventReq)
}

export async function deleteTodo(eventId: string, ownerId: string) {

  return eventsAccess.deleteTodo(eventId, ownerId)
}

export function createSignedUrl(eventId: string) {
  console.log(eventId)
  
  // check first if event exists
  const imageId = generateRandomUUID()
  const result = generateSignedUrl(imageId)

  // update Existing event with result.imgUrl

  return result.signedUrl
}
