import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { Game } from '../models/Game'

const XAWS = AWSXRay.captureAWS(AWS)

export class GamesAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient,
    private readonly gamesTable = process.env.GAMES_TABLE) { }

  async getGames(): Promise<Game[]> {
    const result = await this.docClient.scan({
      TableName: this.gamesTable
    }).promise()

    const games = result.Items
    return games as Game[]
  }

}