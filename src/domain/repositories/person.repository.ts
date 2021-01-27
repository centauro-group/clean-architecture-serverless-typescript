import PersonEntity from '../entities/person.entity'

//Port
export default interface PersonRepository {
  create(person: PersonEntity): Promise<PersonEntity>

  update(person: PersonEntity): Promise<PersonEntity>
}
