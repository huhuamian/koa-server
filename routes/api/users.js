const Router = require('koa-router'); // 路由
const router = new Router();
// const bcrypt = require('bcryptjs'); // 加密
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

        // console.log('newUser>>>>>>>>>', newUser);

        // 将密码加密
        // await bcrypt.genSalt(10, (err, salt) => {
        //     bcrypt.hash(newUser.password, salt, (err, hash) => {
        //         // Store hash in your password DB.
        //         // console.log('hash>>>>>>>>>>>>', hash);
        //         if (err) throw err;
        //         newUser.password = hash;

        //         // 存储到数据库
        //         newUser
        //         .save()
        //         .then(user => {
        //             ctx.body = user;
        //         })
        //         .catch(err => {
        //             console.log('err:', err);
        //         });

        //         // 返回json数据
        //         ctx.body = newUser;
        //     });
        // });

        // 将密码加密
        // const passwordHash = tools.enbcrype(newUser.password);
        // newUser.password = passwordHash;

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

        // setTimeout(() => {

        //     // 存储到数据库
        //     newUser
        //     .save()
        //     .then(user => {
        //         ctx.body = user;
        //     })
        //     .catch(err => {
        //         console.log('err:', err);
        //     });

        //     // // 返回json数据
        //     // ctx.body = newUser;

        // }, 100);

        // // 存储到数据库
        // await newUser
        // .save()
        // .then(user => {
        //     ctx.body = user;
        // })
        // .catch(err => {
        //     console.log('err:', err);
        // });

        // // 返回json数据
        // ctx.body = newUser;

    }
})



module.exports = router.routes();

