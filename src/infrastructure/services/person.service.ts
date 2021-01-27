import personEntity from '../../domain/entities/person.entity'
import PersonRepository from '../../domain/repositories/person.repository'
//Adapter
export default class PersonService implements PersonRepository {
  create(person: personEntity): Promise<personEntity> {
    throw new Error('Method not implemented.')
  }
  update(person: personEntity): Promise<personEntity> {
    throw new Error('Method not implemented.')
  }
}
