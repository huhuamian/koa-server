const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateloginInput(data) {
    // console.log('data>>>>>>>>>>>>>>>>>>', data);
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    
    if (!Validator.isEmail(data.email)) {
        errors.email = '邮箱不合法！';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "邮箱不能为空";
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = '密码长度不能小于6位，大于30位';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = '密码不能为空！';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}