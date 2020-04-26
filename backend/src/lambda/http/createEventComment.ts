
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateEventCommentRequest } from './../../requests/createEventCommentRequest'
import { addCommentToEvent } from '../../bLogic/events'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const newEventCommentReq: CreateEventCommentRequest = JSON.parse(event.body)
  const eventId = event.pathParameters.eventId

  const userId = '7890' // TODO: get userId from jwt
  const updatedEvent = await addCommentToEvent(newEventCommentReq, userId, eventId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({item: updatedEvent})
  }
}