let _instance = {
    to_string: 24,
    max_size: 10,
    map_lasted_id: {},
    queue_lasted_id: [],
    getSuffix(prefix) {
        if (!_instance.map_lasted_id[prefix]) {
            //check limited size of chaching prefix
            if (_instance.queue_lasted_id.length >= _instance.max_size) {
                let removedId = _instance.queue_lasted_id.shift()
                _instance.map_lasted_id[removedId] = undefined
            }
            _instance.queue_lasted_id.push(prefix)
            _instance.map_lasted_id[prefix] = 0
        }
        _instance.map_lasted_id[prefix] += 1
        return _instance.map_lasted_id[prefix].toString(_instance.to_string)
    },
    idGen() {
        let ctime = +new Date()
        let prefix = ctime.toString(_instance.to_string)
        let suffix = _instance.getSuffix(prefix)
        return `${prefix}${suffix}`
    }
}

const IdGen = _instance.idGen

export default IdGen