export default {
    /**
     * Validate phone number in NZ
     * @param {Number} phone 
     */
    validatePhone(phone) {
        const reg = /^(\+?64|0)2\d{7,9}$/
        return reg.test(phone)
    }
}