import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { Event } from '../../models/Event'
import { getEvents } from '../../bLogic/events'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const queryParams = event.queryStringParameters
  console.log('TRAZA QP: ', queryParams)
  let events: Event[]

  try {
    events = await getEvents(queryParams)
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ items: events }),
    };
  } catch (error) {
    return {
      statusCode: 403,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'operation not allowed!!' }),
    };
  }

};
