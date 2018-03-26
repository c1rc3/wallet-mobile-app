import IdGen from '../util/IdGen'
import LocalStorage from './LocalStorage'

export default function localStorageBuilder(options) {
    let listIdsKey = options.list_ids_key
    let detailPrefix = options.detail_prefix
    let ModelClass = options.class
    return {
        genId() {
            return IdGen()
        },
        set(id, data) {
            return LocalStorage.setObject(`${detailPrefix}${id}`, data)
        },
        get(id) {
            return LocalStorage.getObject(`${detailPrefix}${id}`)
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
            return LocalStorage.setObject(listIdsKey, ids)
        },
        getListIds() {
            return LocalStorage.getObject(listIdsKey)
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
                                return new ModelClass(walletResp.data)
                            }
                            return null
                        })
                    })).then(wallets => {
                        return new ModelClass(wallets.filter(w => w !== null))
                    })
                }
            })
        },
        add(data) {
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
        update(id, data = {}) {
            let updated_time = +new Date()
            return LocalStorage.mergeObject(`${detailPrefix}${id}`, {
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
}