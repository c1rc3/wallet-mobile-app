import WalletService, { WalletInfo } from '../../src/service/Wallet'

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

describe('Test Wallet CRUD', () => {
    let wallet_data_1 = {
        name: 'Wallet Test',
        type: 'BTC',
        private_key: '_private_key',
        public_key: '_public_key',
    }
    let wallet_data_1_updated = {
        name: 'Wallet Test Updated',
        type: 'BTS',
        private_key: '_private_key_updated',
        public_key: '_private_key_updated',
    }
    let wallet_data_2 = {
        name: 'Wallet Test 2',
        type: 'ETH',
        private_key: '_private_key_2',
        public_key: '_public_key_2',
    }
    let wallet1 = new WalletInfo(wallet_data_1)
    let wallet2 = new WalletInfo(wallet_data_2)

    test('add/get FIRST wallet should be success with generated id', () => {
        expect.assertions(6)
        return WalletService.addWallet(wallet1.serialize).then(resp => {
            expect(resp.error).toBeUndefined()
            expect(resp.data.id).toBeDefined()
            wallet1._parsingData(resp.data)
            return Promise.all([
                WalletService.get(wallet1.id).then(wdResp => {
                    expect(wdResp.error).toBeUndefined()
                    expect(wdResp.data).toMatchObject(wallet_data_1)
                    return wdResp
                }),
                WalletService.getAll().then(allWalletResp => {
                    expect(allWalletResp.error).toBeUndefined()
                    expect(allWalletResp.data.length).toBe(1)
                    return allWalletResp
                })
            ]).then(allResp => allResp)
        })
    })
    test('add/get SECOND wallet should be success with generated id', () => {
        expect.assertions(6)
        return WalletService.addWallet(wallet2.serialize).then(resp => {
            expect(resp.error).toBeUndefined()
            expect(resp.data.id).toBeDefined()
            wallet2._parsingData(resp.data)
            return Promise.all([
                WalletService.get(wallet2.id).then(wdResp => {
                    expect(wdResp.error).toBeUndefined()
                    expect(wdResp.data).toMatchObject(wallet_data_2)
                    return wdResp
                }),
                WalletService.getAll().then(allWalletResp => {
                    expect(allWalletResp.error).toBeUndefined()
                    expect(allWalletResp.data.length).toBe(2)
                    return allWalletResp
                })
            ]).then(allResp => allResp)
        })
    })
    test('Update/GET wallet should be success with be not changed createdTime and updated updatedTime', () => {
        expect.assertions(4)
        return WalletService.updateWallet(wallet1.id, wallet_data_1_updated).then(resp => {
            expect(resp.error).toBeUndefined()
            return WalletService.get(wallet1.id).then(walletResp => {
                expect(walletResp.error).toBeUndefined()
                expect(walletResp.data).toMatchObject({
                    ...wallet_data_1_updated,
                    id: wallet1.id,
                    created_time: wallet1.createdTime
                })
                expect(walletResp.data.updated_time).not.toBe(wallet1.updatedTime)
                wallet1._parsingData(walletResp.data)
            })
        })
    })
    test('Get All Wallet should be success with 2 added wallet', () => {
        expect.assertions(4)
        return WalletService.getAll().then(resp => {
            expect(resp.error).toBeUndefined()
            expect(resp.data.length).toBe(2)
            //contain wallet 1
            expect(resp.data.find(w => w.id === wallet1.id)).toBeInstanceOf(WalletInfo)
            //contain wallet 2
            expect(resp.data.find(w => w.id === wallet2.id)).toBeInstanceOf(WalletInfo)

            return resp
        })
    })
    test('Delete/GET wallet should be success with null data and remove id from list wallet ids', () => {
        expect.assertions(5)
        return WalletService.delete(wallet1.id).then(resp => {
            expect(resp.error).toBeUndefined()
            return WalletService.get(wallet1.id).then(walletResp => {
                expect(walletResp.data).toBe(null)
                return WalletService.getListIds().then(idsResp => {
                    expect(idsResp.error).toBeUndefined()
                    expect(idsResp.data.find(id => id === wallet1.id)).toBeUndefined()
                    expect(idsResp.data.length).toBe(1)
                })
            })
        })
    })
})


