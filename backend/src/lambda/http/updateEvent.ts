import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { Event } from '../../models/Event'
import { updateEvent } from '../../bLogic/events'
import { UpdateEventRequest } from './../../requests/updateEventRequest'
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const updateEventReq: UpdateEventRequest = JSON.parse(event.body)
  const eventId: string = event.pathParameters.eventId
  const ownerId: string = getUserId(event)

  
  try {
    const updatedEvent: Event = await updateEvent(eventId, ownerId, updateEventReq)
    return {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ item: updatedEvent }),
    }
  } catch (error) {
    console.log('TRAZA ERROR UPDATE: ', error)
    return {
      statusCode: error.statusCode,
      headers: {
      'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(error.message),
    }
  }


};
