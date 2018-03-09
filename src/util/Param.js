import _ from 'lodash'

export const Param = {
    objectToString(object) {
        if (_.isObject(object)) {
            let str = ''
            for (let k in object) {
                let val = object[k]
                if (_.isNull(val) || _.isUndefined(val) || _.isEmpty(val)) {
                    continue
                } else if (_.isArray(val)) {
                    val = val.join(',')
                }
                str += `${k}=${val}&`
            }
            return str
        }
        return ''
    }
}

export default Param