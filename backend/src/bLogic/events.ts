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
  await eventsAccess.addCommentToEvent(newComment, eventId, event.ownerId)

  return newComment
}

export async function updateEvent(eventId: string, ownerId: string, updateEventReq: UpdateEventRequest) {

  // TODO: validate dates here!!

  const targetEvent: Event = await eventsAccess.getEventById(eventId)

  console.log('event to update: ', targetEvent)

  if (!targetEvent) {
    return Promise.reject({
      statusCode: 404,
      message: 'Event not found'
    })
  }
  else if (targetEvent.ownerId !== ownerId) {
    return Promise.reject({
      statusCode: 401,
      message: 'You are not the owner of this event!'
    })
  } else {
    return eventsAccess.updateEvent(eventId, ownerId, updateEventReq)
  }

}

export async function deleteTodo(eventId: string, ownerId: string) {

  return eventsAccess.deleteTodo(eventId, ownerId)
}

export async function createSignedUrl(eventId: string, ownerId: string) {

  const targetEvent: Event = await eventsAccess.getEventById(eventId)

  if (targetEvent) {
    const imageId = generateRandomUUID()
    const result = generateSignedUrl(imageId)

    await eventsAccess.updateEventImage(eventId, ownerId, result.imgUrl)

    return result.signedUrl
  } else {
    console.log('404 event not found')
    return ''
  }


}

export async function getEventById(eventId: string) {

  return eventsAccess.getEventById(eventId)
}
