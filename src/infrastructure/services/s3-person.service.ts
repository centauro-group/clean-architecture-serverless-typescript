import * as AWS from 'aws-sdk'
import { v4 as uuid } from 'uuid'

import PersonEntity from '../../domain/entities/person.entity'
import personEntity from '../../domain/entities/person.entity'
import PersonRepository from '../../domain/repositories/person.repository'
//Adapter
export default class S3PersonService implements PersonRepository {
  public bucketName: string
  public s3Bucket: AWS.S3

  constructor() {
    this.bucketName = process.env.PERSON_BUCKET_NAME
    this.s3Bucket = new AWS.S3()
  }

  async getById(id: string): Promise<PersonEntity> {
    const person = await this.s3Bucket
      .getObject({
        Bucket: this.bucketName,
        Key: `${id}.json`,
      })
      .promise()

    return JSON.parse(person.Body.toString('utf-8'))
  }

  async create(person: personEntity): Promise<personEntity> {
    const newPerson = {
      ...person,
      id: uuid(),
    }

    await this.s3Bucket
      .upload({
        Bucket: this.bucketName,
        Key: `${newPerson.id}.json`,
        Body: JSON.stringify(newPerson),
      })
      .promise()

    return newPerson
  }

  async update(person: personEntity): Promise<personEntity> {
    const personFound = await this.getById(person.id)

    const updatedPerson = {
      ...personFound,
      ...person,
    }

    await this.s3Bucket
      .upload({
        Bucket: this.bucketName,
        Key: `${person.id}.json`,
        Body: JSON.stringify(updatedPerson),
      })
      .promise()

    return updatedPerson
  }
}
