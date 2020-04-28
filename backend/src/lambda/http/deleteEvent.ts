import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { deleteTodo } from '../../bLogic/events'
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const eventId: string = event.pathParameters.eventId
  const ownerId: string = getUserId(event)

  await deleteTodo(eventId, ownerId)

  return {
    statusCode: 200,
    headers: {
    'Access-Control-Allow-Origin': '*',
    },
    body: '',
  }

};
