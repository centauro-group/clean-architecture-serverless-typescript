import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import updatePersonUseCase from '../domain/use-cases/updatePerson'
import DynamoDBPersonService from '../infrastructure/services/dynamodb-person.service'

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { person } = JSON.parse(event.body)

  const personService = new DynamoDBPersonService()

  const useCase = updatePersonUseCase(personService)
  const result = await useCase(person)

  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2),
  }
}
