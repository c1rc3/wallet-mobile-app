import IdGen from '../util/IdGen'
import LocalStorage from './LocalStorage'
import DataResponse from '../entity/DataResponse'

export default function localStorageBuilder(options) {
    let listIdsKey = options.list_ids_key
    let detailPrefix = options.detail_prefix
    const ModelClass = options.constructor
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
                    //remove item
                    this.set(id, null).then(deleteResp => {
                        if (!deleteResp.error) {
                            //update list item ids
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
                    return Promise.all(ids.map(id => {
                        return this.get(id).then(itemResp => {
                            if (!itemResp.error) {
                                return new ModelClass(itemResp.data)
                            }
                            return null
                        })
                    })).then(items => {
                        return new DataResponse.success(items.filter(w => w !== null))
                    })
                }
            })
        },
        add(data) {
            let id = this.genId()
            return this.set(id, {
                ...data,
                id
            }).then(setResp => {
                if (!setResp.error) {
                    return this.getListIds().then(listIdsResp => {
                        let ids = [...(listIdsResp.data || []), id]
                        return this.setListIds(ids).then(setListIdsResq => {
                            if (!setListIdsResq.error) {
                                setListIdsResq.data = {
                                    ...data,
                                    id
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
            return LocalStorage.mergeObject(`${detailPrefix}${id}`, data).then(resp => {
                if (!resp.error) {
                    resp.data = data
                }
                return resp
            })
        }
    }
}