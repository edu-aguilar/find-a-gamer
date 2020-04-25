import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { DynamoDB } from 'aws-sdk'

import { Event } from './../models/Event'

export class EventsAccess {

  constructor(
    private readonly docClient: DocumentClient = new DynamoDB.DocumentClient,
    private readonly eventsTable = process.env.EVENTS_TABLE) { }

  async createEvent(event: Event): Promise<Event> {
    await this.docClient.put({
      TableName: this.eventsTable,
      Item: event
    }).promise()

    return event as Event
  }

}