import PersonRepository from "../domain/repositories/person.repository";
import DynamoDBPersonService from "../infrastructure/services/dynamodb-person.service";

export default class StorageFactory {
    static make(): PersonRepository {
        const storageStrategy = process.env.STORAGE_STRATEGY

        let repository: PersonRepository

        switch (storageStrategy) {
            case 'dynamodb':
                repository = new DynamoDBPersonService()
                break;
            case 's3':
                // repository = new S3PersonService()
                break;
        }

        return repository
    }
}
