const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfilesSchema = new Schema({
    user: { // 关联User数据表
        type: String,
        ref: 'users',
        require: true,
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: { // title
        type: String
    },
    website: { // 网站
        type: String,
    },
    location: { // 地区
        type: String,
    },
    status: { // 职业
        type: String,
        required: true,
    },
    skills: { // 技能
        type: [String],
        required: true
    },
    bio: { // 个人介绍
        type: String,
    },
    githubusername: {
        type: String,
    },
    experience: [ // 工作经历
        {
            current: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                require: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String
            },
            description: {
                type: String,
            }
        }
    ],
    education: [
        {
            current: {
                type: String,
                default: true,
            },
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
    social: {
        wechat: {
            type: String
        },
        QQ: {
            type: String
        },
        tengxunkt: {
            type: String
        },
        wangyikt: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Profile = mongoose.model('profile', ProfilesSchema);