import _ from 'lodash'
export const number = {
    between(number, fromValue, toValue) {
        return number >= fromValue && number <= toValue
    }
}

export const func = {
    executeFuncQueues(funcQueues, args) {
        console.warn('executeFuncQueues')
        if (!_.isArray(args)) {
            args = []
        }
        if (!_.isArray(funcQueues)) return
        funcQueues.forEach(func => {
            _.isFunction(func) ? func(...args) : null
        })
    },
    mergeFuncQueues(funcQueues, func) {
        let res = []
        if (_.isArray(funcQueues)) {
            res = funcQueues
            if (_.isFunction(func)) {
                res = [
                    ...res.filter(i => i != func),
                    func
                ]
            }
        }
        return res
    }
}