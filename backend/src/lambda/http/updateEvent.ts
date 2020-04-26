import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { Event } from '../../models/Event'
import { updateEvent } from '../../bLogic/events'
import { UpdateEventRequest } from './../../requests/updateEventRequest'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const updateEventReq: UpdateEventRequest = JSON.parse(event.body)
  const eventId: string = event.pathParameters.eventId
  const ownerId: string = '12345' // TODO: get this from JWT

  const updatedEvent: Event = await updateEvent(eventId, ownerId, updateEventReq)

  return {
    statusCode: 200,
    headers: {
    'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ item: updatedEvent }),
  }

};
