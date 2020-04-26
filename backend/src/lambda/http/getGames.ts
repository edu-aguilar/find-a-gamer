import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

import { Game } from '../../models/Game'
import { getGames } from '../../bLogic/games'

export const handler: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {

  let games: Game[]

  games = await getGames()

  return {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ items: games }),
  }

};
