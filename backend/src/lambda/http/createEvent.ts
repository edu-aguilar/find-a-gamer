
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateEventRequest } from './../../requests/createEventRequest'
import { createEvent } from '../../bLogic/events'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const newEventReq: CreateEventRequest = JSON.parse(event.body)
  console.log('TRAZA: ', newEventReq)
  const ownerId = '12345' // TODO: get ownerId from jwt
  const createdEvent = await createEvent(newEventReq, ownerId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({item: createdEvent})
  }
}