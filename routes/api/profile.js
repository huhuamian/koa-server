const Router = require('koa-router'); // 引入路由
const router = new Router();
const passport = require('koa-passport');

// 引入profile模板
const Profile = require('../../models/Profile');

/**
 * @route Get api/profile/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */ 
router.get('/test', async ctx => {
    ctx.status = 200;
    ctx.body = {mes: 'profile works...'};
})

/**
 * @route GET api/profile
 * @desc 个人信息接口地址
 * @access 接口是私有的
 */
router.get('/', passport.authenticate('jwt', { session: false }), async ctx => {
    // console.log('ctx.state.user》》》', ctx.state.user);
    // const profile = await Profile.find({user: ctx.state.user.id})
    const profile = await Profile.find({user: ctx.state.user._id}).populate('users', ['name', 'avatar']); // TODO users 需要注意
    // console.log('profile>>>>>>>>>>>>', profile);
    if (Array.isArray(profile) && profile.length > 0) {
        // 如果成功
        ctx.status = 200;
        ctx.body = profile;
    } else {
        // 没有返回
        ctx.status = 200;
        ctx.body = {noprofile: '给用户没有任何相关信息'};
        return;
    }
});

/**
 * @router POST api/profile
 * @desc 添加和编辑个人信息接口
 * @access 接口是私有的
*/
router.post('/', passport.authenticate('jwt', {session: false}), async ctx => {
    const profileFields = {};

    profileFields.user = ctx.state.user.id;
    
    if(ctx.request.body.handle) profileFields.handle = ctx.request.body.handle;
    if(ctx.request.body.status) profileFields.status = ctx.request.body.status;
    if(ctx.request.body.company) profileFields.company = ctx.request.body.company;
    if(ctx.request.body.website) profileFields.website = ctx.request.body.website;
    if(ctx.request.body.location) profileFields.location = ctx.request.body.location;
    if(ctx.request.body.wangyikt) profileFields.wangyikt = ctx.request.body.wangyikt;

    // skills 数据转换
    if(ctx.request.body.skills !== 'undefined') {
        profileFields.skills = ctx.request.body.skills.split(',');
    };


    if(ctx.request.body.bio) profileFields.bio = ctx.request.body.bio;
    if(ctx.request.body.githubusername) profileFields.githubusername = ctx.request.body.githubusername;

    profileFields.social = {};
    if(ctx.request.body.wechat) profileFields.social.wechat = ctx.request.body.wechat;
    if(ctx.request.body.QQ) profileFields.social.QQ = ctx.request.body.QQ;
    if(ctx.request.body.tengxunkt) profileFields.social.tengxunkt = ctx.request.body.tengxunkt;
    if(ctx.request.body.wechat) profileFields.social.wechat = ctx.request.body.wechat;

    // 查询数据库
    const profile = await Profile.find({user: ctx.state.user.id});
    console.log('profile>>>>>>>>>>>>>>>>>>>>>', profile)

    if (profile.length > 0) {
        // 说明数据已存在，是编辑
        const profileUpdate = await Profile.findOneAndUpdate(
            {user: ctx.state.user.id},
            {$set: profileFields},
            {new: true}
        );
        ctx.body = profileUpdate;
    } else {
        // 数据不存在， 是新增
        await new Profile(profileFields).save().then(profile => {
            ctx.status = 200;
            ctx.body = profile;
        })
    }

})



module.exports = router.routes();
