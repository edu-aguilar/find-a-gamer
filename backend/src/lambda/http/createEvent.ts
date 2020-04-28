
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateEventRequest } from './../../requests/createEventRequest'
import { createEvent } from '../../bLogic/events'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const newEventReq: CreateEventRequest = JSON.parse(event.body)

  const ownerId = getUserId(event)
  const createdEvent = await createEvent(newEventReq, ownerId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({item: createdEvent})
  }
}