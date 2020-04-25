import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { DynamoDB } from 'aws-sdk'

import { Event } from './../models/Event'

export class EventsAccess {

  constructor(
    private readonly docClient: DocumentClient = new DynamoDB.DocumentClient,
    private readonly eventsTable = process.env.EVENTS_TABLE,
    private readonly eventsTableByGameIndex = process.env.EVENTS_GAME_ID_INDEX,
    private readonly eventsTableByOwnerIndex = process.env.EVENTS_OWNER_ID_INDEX) { }

  async createEvent(event: Event): Promise<Event> {
    await this.docClient.put({
      TableName: this.eventsTable,
      Item: event
    }).promise()

    return event as Event
  }

  async getEventsByGameId(gameId: string): Promise<Event[]> {
    const result = await this.docClient.query({
      TableName : this.eventsTable,
      IndexName : this.eventsTableByGameIndex,
      KeyConditionExpression: 'gameId = :gameId',
      ExpressionAttributeValues: {
          ':gameId': gameId
        }
    }).promise()

    const events = result.Items
    return events as Event[]
  }

  async getEventsByOwnerId(ownerId: string): Promise<Event[]> {
    const result = await this.docClient.query({
      TableName : this.eventsTable,
      IndexName : this.eventsTableByOwnerIndex,
      KeyConditionExpression: 'ownerId = :ownerId',
      ExpressionAttributeValues: {
          ':ownerId': ownerId
        }
    }).promise()

    const events = result.Items
    return events as Event[]
  }

}