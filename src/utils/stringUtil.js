export default {
    /**
     * Validate phone number in NZ
     * @param {Number} phone 
     */
    validatePhone(phone) {
        // const reg = /^(\+?64|0)2\d{7,9}$/
        const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
        return reg.test(phone)
    }
}