/*
 *当前文件是user.js 数据库模型
*/ 
const mongoose = require('mongoose'); //引入帮助操作数据库
const Schema = mongoose.Schema; //引入模板

// 实例化数据模板
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model('users', UserSchema);
