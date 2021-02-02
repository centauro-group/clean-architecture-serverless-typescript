import * as AWS from 'aws-sdk'
import { PutItemInput, QueryInput, UpdateItemInput } from 'aws-sdk/clients/dynamodb'
import { v4 as uuid } from 'uuid'

import PersonEntity from '../../domain/entities/person.entity'
import personEntity from '../../domain/entities/person.entity'
import PersonRepository from '../../domain/repositories/person.repository'
//Adapter
export default class DynamoDBPersonService implements PersonRepository {
  public tableName: string
  public documentClient: AWS.DynamoDB.DocumentClient

  constructor() {
    this.tableName = process.env.PERSON_TABLE_NAME
    this.documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' })
  }

  async getById(id: string): Promise<PersonEntity> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: '#id = :id',
      ExpressionAttributeNames: { '#id': 'id' },
      ExpressionAttributeValues: { ':id': id }
    } as QueryInput

    const { Items } = await this.documentClient.query(params).promise()
    const [firstResult] = Items

    if (!firstResult) throw new Error('Person not found')

    return firstResult as PersonEntity
  }

  async create(person: personEntity): Promise<personEntity> {
    const newPerson = {
      ...person,
      id: uuid()
    }

    const params = {
      TableName: this.tableName,
      Item: newPerson
    } as PutItemInput

    await this.documentClient.put(params).promise()

    return newPerson
  }

  async update(person: personEntity): Promise<personEntity> {
    const { id } = person
    const personFound = await this.getById(id)

    const updatedPerson = {
      ...personFound,
      ...person
    }

    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set #name = :name, #lastName = :lastName, #cellphone = :cellphone, #mail = :mail',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#lastName': 'lastName',
        '#cellphone': 'cellphone',
        '#mail': 'mail',
      },
      ExpressionAttributeValues: {
        ':name': updatedPerson.name,
        ':lastName': updatedPerson.lastName,
        ':cellphone': updatedPerson.cellphone,
        ':mail': updatedPerson.mail,
      }
    } as UpdateItemInput

    await this.documentClient.update(params).promise()

    return updatedPerson
  }
}
