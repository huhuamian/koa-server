const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

// 实例化对象
const app = new Koa();
const router = new Router();

app.use(bodyParser());

// 引入users.js\profile.js
const users = require('./routes/api/users.js');
const profile = require('./routes/api/profile.js');

// 路由跳转
router.get('/', async ctx => (ctx.body = {mes: 'Hello Koa!!'}));

// 数据库地址
const dbPath = require('./config/keys.js').mongoURI;
// 连接数据库
mongoose.connect(dbPath, { useUnifiedTopology: true })
.then(() => {
    console.log('数据库连接成功！');
}).catch(err => {
    console.log('数据库连接失败！');
    console.log(err);
});

app.use(passport.initialize());
app.use(passport.session());

// 回调到config文件中 passport.js
require('./config/passport')(passport);

// 配置路由地址
router.use('/api/users', users);
router.use('/api/profile', profile);

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

// 设置端口号
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Started in ${port}`);
});