
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateEventCommentRequest } from './../../requests/createEventCommentRequest'
import { addCommentToEvent } from '../../bLogic/events'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const newEventCommentReq: CreateEventCommentRequest = JSON.parse(event.body)
  const eventId = event.pathParameters.eventId

  const userId = getUserId(event)
  const newComment = await addCommentToEvent(newEventCommentReq, userId, eventId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({item: newComment})
  }
}