const Router = require('koa-router'); // 路由
const router = new Router();
const bcrypt = require('bcryptjs'); // 加密
const gravatar = require('gravatar'); // 全球公认头像
const tools = require('../../config/tools');


// 引入User模型
const User = require('../../models/User')

/**
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
*/
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = {mes: 'user works...'};
})

/**
 * @route api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post('/register', async ctx => {
    // console.log(ctx.request.body);

    // 存储到数据库
    const findResult = await User.find({email: ctx.request.body.email})
    // console.log('findResult>>>>>>>>>>>', findResult);
    if (findResult.length > 0) {
        // 说明查到相同数据
        ctx.status = 500;
        ctx.body = {'email': '邮箱已被占用！！！'};
    } else {
        // 没查到，说明数据不存在

        // 设置头像
        const avatar = gravatar.url(ctx.request.body.email, {s: '200', r: 'pg', d: 'mm'});

        const newUser = new User({
            name: ctx.request.body.name,
            email: ctx.request.body.email,
            password: tools.enbcrypt(ctx.request.body.password),
            avatar,
        })

        // 保存数据
        newUser
        .save()
        .then(user => {
            ctx.body = user;
        })
        .catch(err => {
            console.log(err);
        })

        ctx.body = newUser;

        console.log('newUser2222222222', newUser);

    }
});

/**
 * @route api/users/login
 * @desc 登录接口 返回token（token中存有用户信息，并且用于其他接口的请求）
 * @access 接口是公开的
 * 
*/ 
router.post('/login', async ctx => {
    // 查询当前登录的邮箱在数据库当中是否存在
    const findResult = await User.find({email: ctx.request.body.email});

    if (findResult.length > 0) {
        // 用户存在，验证其他信息
        // 查到用户信息后，验证密码
        const checkPasswordResult = await bcrypt.compareSync(ctx.request.body.password, findResult[0].password);
        if (checkPasswordResult) {
            // 密码验证成功
            // 返回token
            ctx.status = 200;
            ctx.body = {success: '验证成功！'};

        } else {
            // 密码验证失败
            ctx.status = 400;
            ctx.body = {password: '密码错误！'};
        }


    } else {
        // 用户不存在
        ctx.status = 404;
        ctx.body = {email: '用户不存在！'};
    }

});


module.exports = router.routes();

