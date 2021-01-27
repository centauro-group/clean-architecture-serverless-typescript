import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import createPersonUseCase from '../domain/use-cases/createPerson'
import PersonService from '../infrastructure/services/person.service'

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const { person } = JSON.parse(event.body)

  const personService = new PersonService()

  const useCase = createPersonUseCase(personService)
  const result = await useCase(person)

  return {
    statusCode: 201,
    body: JSON.stringify(result, null, 2),
  }
}