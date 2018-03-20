const Formatter = {
    string: '',
    number: () => {

    },
    ccvalue(number = 0, maxLength = 9) {
        return this.decimal(number, Math.max(maxLength - number.toFixed(0).length, 0))
    },
    decimal(number = 0, digrit = 2, defaultText = '0') {
        let val = parseFloat(number || 0).toFixed(digrit)
        var arr = `${val || defaultText}`.split('.')
        return `${arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${arr.length > 1 ? `.${arr[1]}` : ''}`
    }
}

export default Formatter