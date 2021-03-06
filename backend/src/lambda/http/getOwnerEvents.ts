
import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { Event } from '../../models/Event'
import { getEventsByOwnerId } from '../../bLogic/events'
import { toUtf8 } from '../utils';


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const ownerId = toUtf8(event.pathParameters.ownerId)
  const events: Event[] = await getEventsByOwnerId(ownerId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ items: events }),
  }

}
