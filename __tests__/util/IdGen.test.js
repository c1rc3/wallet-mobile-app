import IdGen from '../../src/util/IdGen'

describe('Test IdGen', () => {
    const num_ids = 1000
    test(`It should not duplicated id when gen ${num_ids} key`, () => {
        let mapIds = {}
        for (let i = 0; i <= num_ids; i++) {
            let id = IdGen()
            expect(mapIds[id]).toBeUndefined()
            mapIds[id] = true
        }
        console.log(mapIds)
    })
})