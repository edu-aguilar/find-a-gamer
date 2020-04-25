import { v4 as generateRandomUUID } from 'uuid'

import { Event } from './../models/Event'
import { CreateEventRequest } from '../requests/createEventRequest'
import { EventsAccess } from '../datalayer/eventsAccess'

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
