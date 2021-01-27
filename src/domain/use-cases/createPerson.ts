import PersonEntity from '../entities/person.entity'
import PersonRepository from '../repositories/person.repository'

const createPersonUseCase = (personRepository: PersonRepository) => async (
  person: PersonEntity
): Promise<PersonEntity> => {
  return personRepository.create(person)
}

export default createPersonUseCase
