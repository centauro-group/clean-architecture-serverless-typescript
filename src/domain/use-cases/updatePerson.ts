import PersonEntity from '../entities/person.entity'
import PersonRepository from '../repositories/person.repository'

const updatePersonUseCase = (personRepository: PersonRepository) => async (
  person: PersonEntity
): Promise<PersonEntity> => {
  return personRepository.update(person)
}

export default updatePersonUseCase
