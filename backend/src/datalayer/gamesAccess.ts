import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { DynamoDB } from 'aws-sdk'

import { Game } from '../models/Game'

export class GamesAccess {

  constructor(
    private readonly docClient: DocumentClient = new DynamoDB.DocumentClient,
    private readonly gamesTable = process.env.GAMES_TABLE) { }

  async getGames(): Promise<Game[]> {
    const result = await this.docClient.scan({
      TableName: this.gamesTable
    }).promise()

    const games = result.Items
    return games as Game[]
  }

}