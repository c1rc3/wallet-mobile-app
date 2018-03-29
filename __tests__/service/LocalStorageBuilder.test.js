import LocalStorageBuilder from '../../src/service/LocalStorageBuilder'
import deneric from 'deneric'

//mock ReactNative AsyncStorage as on-memory-database
jest.mock('react-native', () => {
    let _data = {}
    return ({
        AsyncStorage: {
            setItem: jest.fn((key, data, callback) => {
                _data[key] = data
                callback ? callback(null) : null
            }),
            getItem: jest.fn((key, callback) => {
                callback ? callback(null, _data[key]) : null
            }),
            mergeItem: jest.fn((key, data, callback) => {
                _data[key] = JSON.stringify({
                    ...JSON.parse(_data[key] || '{}'),
                    ...JSON.parse(data || '{}'),
                })
                callback ? callback(null, _data[key]) : null
            }),
        }
    })
})

class TestEntity extends deneric.Entity {
    constructor(data) {
        super(data, {
            id: ['id', deneric.String],
            name: ['name', deneric.String],
            privateKey: ['private_key', deneric.String],
            publicKey: ['public_key', deneric.String],
            type: ['type', deneric.String],
        })
    }
}

const TestService = LocalStorageBuilder({
    list_ids_key: '__test_ids_',
    detail_prefix: '__test_',
    constructor: TestEntity
})

describe('Test LocalStrorageBuilder for CRUD, get listing features', () => {
    let test_data_1 = {
        name: 'Entity Test',
        type: 'E1',
        private_key: '_private_key',
        public_key: '_public_key',
    }
    let test_data_1_updated = {
        name: 'Entity Test Updated',
        type: 'E2',
        private_key: '_private_key_updated',
        public_key: '_private_key_updated',
    }
    let test_data_2 = {
        name: 'Entity Test 2',
        type: 'B1',
        private_key: '_private_key_2',
        public_key: '_public_key_2',
    }
    let entity1 = new TestEntity(test_data_1)
    let entity2 = new TestEntity(test_data_2)

    test('add/get FIRST entity should be success with generated id', () => {
        expect.assertions(6)
        return TestService.add(entity1.serialize).then(resp => {
            expect(resp.error).toBeUndefined()
            expect(resp.data.id).toBeDefined()
            entity1._parsingData(resp.data)
            return Promise.all([
                TestService.get(entity1.id).then(wdResp => {
                    expect(wdResp.error).toBeUndefined()
                    expect(wdResp.data).toMatchObject(test_data_1)
                    return wdResp
                }),
                TestService.getAll().then(allEntities => {
                    expect(allEntities.error).toBeUndefined()
                    expect(allEntities.data.length).toBe(1)
                    return allEntities
                })
            ]).then(allResp => allResp)
        })
    })
    test('add/get SECOND entity should be success with generated id', () => {
        expect.assertions(6)
        return TestService.add(entity2.serialize).then(resp => {
            expect(resp.error).toBeUndefined()
            expect(resp.data.id).toBeDefined()
            entity2._parsingData(resp.data)
            return Promise.all([
                TestService.get(entity2.id).then(wdResp => {
                    expect(wdResp.error).toBeUndefined()
                    expect(wdResp.data).toMatchObject(test_data_2)
                    return wdResp
                }),
                TestService.getAll().then(allEntities => {
                    expect(allEntities.error).toBeUndefined()
                    expect(allEntities.data.length).toBe(2)
                    return allEntities
                })
            ]).then(allResp => allResp)
        })
    })
    test('Get All Entity should be success with 2 added entities', () => {
        expect.assertions(4)
        return TestService.getAll().then(resp => {
            expect(resp.error).toBeUndefined()
            expect(resp.data.length).toBe(2)
            //contain entity 1
            expect(resp.data.find(w => w.id === entity1.id)).toBeInstanceOf(TestEntity)
            //contain entity 2
            expect(resp.data.find(w => w.id === entity2.id)).toBeInstanceOf(TestEntity)

            return resp
        })
    })
    test('Delete/GET entity should be success with null data and remove id from list entities ids', () => {
        expect.assertions(5)
        return TestService.delete(entity1.id).then(resp => {
            expect(resp.error).toBeUndefined()
            return TestService.get(entity1.id).then(entityResp => {
                expect(entityResp.data).toBe(null)
                return TestService.getListIds().then(idsResp => {
                    expect(idsResp.error).toBeUndefined()
                    expect(idsResp.data.find(id => id === entity1.id)).toBeUndefined()
                    expect(idsResp.data.length).toBe(1)
                })
            })
        })
    })
})


