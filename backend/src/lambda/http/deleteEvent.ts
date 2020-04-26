import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { deleteTodo } from '../../bLogic/events'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const eventId: string = event.pathParameters.eventId
  const ownerId: string = '12345' // TODO: get this from JWT

  await deleteTodo(eventId, ownerId)

  return {
    statusCode: 200,
    headers: {
    'Access-Control-Allow-Origin': '*',
    },
    body: '',
  }

};
