import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { Event } from '../../models/Event'
import { getEventById } from '../../bLogic/events'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
  const eventId: string = event.pathParameters.eventId
  const _event: Event = await getEventById(eventId)

  
  return {
    statusCode: Object.keys(_event).length ? 200 : 404,
    headers: {
    'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ item: _event }),
  }

};
