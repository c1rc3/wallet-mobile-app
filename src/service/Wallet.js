import deneric from 'deneric'
import LocalStorage from './LocalStorage'
// import uniqid from 'uniqid'
import { SuccessReponse } from '../entity/DataResponse'

export const WALLET = {
    store_key: {
        list_wallets: '__LIST_WALLETS',
        wallet_detail_prefix: '__WALLET_DETAIL_'
    },
    type: {
        bitcoin: 'btc',
        ethereum: 'eth',
        ripple: 'xrp',
    },
    type_name: {
        'btc': 'Bitcoin',
        'eth': 'Ethereum',
        'xrp': 'Ripple',
    }
}

export class WalletInfo extends deneric.Entity {
    constructor(data) {
        super(data, {
            id: ['id', deneric.String],
            name: ['name', deneric.String],
            type: ['type', deneric.String],
            publicKey: ['public_key', deneric.String],
            privateKey: ['private_key', deneric.String],
            createdTime: ['created_time', deneric.Number],
            updatedTime: ['updated_time', deneric.Number]
        })
        this.createdTime = this.createdTime || +new Date()
        this.updatedTime = this.updatedTime || +new Date()
    }
}

const _instance = {
    getTypes() {
        let ids = [WALLET.type.bitcoin, WALLET.type.ethereum, WALLET.type.ripple]
        return ids.map(id => ({
            id: id,
            name: WALLET.type_name[id]
        }))
    },
    genId() {
        return `${+new Date()}`
    },
    set(id, data) {
        return LocalStorage.setObject(`${WALLET.store_key.wallet_detail_prefix}${id}`, data)
    },
    get(id) {
        return LocalStorage.getObject(`${WALLET.store_key.wallet_detail_prefix}${id}`)
    },
    update(id, data) {
        return LocalStorage.mergeObject(`${WALLET.store_key.wallet_detail_prefix}${id}`, data)
    },
    delete(id) {
        return this.getListIds().then(idsResp => {
            if (!idsResp.error) {
                let ids = idsResp.data || []
                //remove wallet
                this.set(id, null).then(deleteResp => {
                    if (!deleteResp.error) {
                        //update list wallet ids
                        return this.setListIds(ids.filter(idTmp => idTmp !== id))
                    }
                    return deleteResp
                })
            }
            return idsResp
        })
    },
    setListIds(ids = []) {
        return LocalStorage.setObject(WALLET.store_key.list_wallets, ids)
    },
    getListIds() {
        return LocalStorage.getObject(WALLET.store_key.list_wallets)
    },
    getAll() {
        return this.getListIds().then(idsResp => {
            if (idsResp.error) {
                return idsResp
            } else {
                let ids = idsResp.data || []
                // let wallets = []
                return Promise.all(ids.map(id => {
                    return this.get(id).then(walletResp => {
                        if (!walletResp.error) {
                            return new WalletInfo(walletResp.data)
                        }
                        return null
                    })
                })).then(wallets => {
                    return new SuccessReponse(wallets.filter(w => w !== null))
                })
            }
        })
    },
    addWallet(data) {
        let id = this.genId()
        let created_time = +new Date()
        let updated_time = created_time
        return this.set(id, {
            ...data,
            id,
            created_time,
            updated_time
        }).then(setResp => {
            if (!setResp.error) {
                return this.getListIds().then(listIdsResp => {
                    let ids = [...(listIdsResp.data || []), id]
                    return this.setListIds(ids).then(setListIdsResq => {
                        if (!setListIdsResq.error) {
                            setListIdsResq.data = {
                                ...data,
                                id,
                                created_time,
                                updated_time
                            }
                        }
                        return setListIdsResq
                    })
                })
            }
            return setResp
        })
    },
    updateWallet(id, data = {}) {
        let updated_time = +new Date()
        return this.update(id, {
            ...data,
            updated_time
        }).then(resp => {
            if (!resp.error) {
                resp.data = data
            }
            return resp
        })
    }
}

export default _instance