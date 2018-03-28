import deneric from 'deneric'
import localStorageBuilder from './LocalStorageBuilder'
import _ from 'lodash'

export const TRANSACTION = {
    store_key: {
        list_monitor: '__LIST_MONITOR',
        monitor_detail_prefix: '__MONITORED_DETAIL_'
    }
}

export class CoinInfo extends deneric.Entity {
    constructor(data) {
        super(data, {
            id: ['slug', deneric.String],
            name: ['name', deneric.String],
            symbol: ['symbol', deneric.String],
            shortName: ['short_name', deneric.String]
        })
    }
}

export class TokenInfo extends deneric.Entity {
    constructor(data) {
        super(data, {
            id: ['slug', deneric.String],
            name: ['name', deneric.String],
            symbol: ['symbol', deneric.String]
        })
    }
}

export class TxMonitorInfo extends deneric.Entity {
    constructor(data) {
        super(data, {
            id: ['id', deneric.String],
            name: ['name', deneric.String],
            type: ['type', deneric.String],
            publicKey: ['public_key', deneric.String],
            createdTime: ['created_time', deneric.Number],
            updatedTime: ['updated_time', deneric.Number],
            tokens: ['tokens', deneric.Array],
            coin: ['coin', deneric.Object],
        })
        this.createdTime = this.createdTime || +new Date()
        this.updatedTime = this.updatedTime || +new Date()
    }
    get tokens() {
        return this._tokens
    }
    set tokens(data) {
        this._tokens = _.isArray(data) ? data.map(item => {
            if (item instanceof TokenInfo) {
                return item
            }
            return new TokenInfo(item)
        }) : []
    }
    get coin() {
        return this._coin
    }
    set coin(value) {
        if (value instanceof CoinInfo) {
            this._coin = value
        } else {
            this._coin = new CoinInfo(value)
        }
    }
    get serialize() {
        return {
            ...super.serialize,
            tokens: this._tokens.map(item => item.serialize),
            coin: this._coin.serialize,
        }
    }
}

const _instance = {
    ...localStorageBuilder({
        list_ids_key: TRANSACTION.store_key.list_monitor,
        detail_prefix: TRANSACTION.store_key.monitor_detail_prefix,
        constructor: TxMonitorInfo
    }),
    getCoins() {
        return require('../assets/data/coins.json').map(item => new CoinInfo(item))
    },
    getTokens() {
        return require('../assets/data/tokens.json').map(item => new TokenInfo(item))
    }
}

export default _instance