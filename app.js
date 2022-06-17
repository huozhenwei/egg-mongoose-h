const mongoose = require('mongoose')
const path = require('path')
const assert = require('assert')
// 自定义重启逻辑
class AppBoot {
    constructor(app) {
        this.app = app
        // 读取配置
        const { url } = this.app.config.mongoose
        assert(url, '[egg-mongoose] url is required on config')
        // 链接数据库
        const db = mongoose.createConnection(url)
        db.on('connected', () => {
            app.logger.info(`[egg-mongoose] ${url} connected successfully`)
        })
        app.mongoose = db
    }

    async willReady() {
        console.log('enable willReady', this.app.config.coreMiddleware)
        // 加载 model 文件
        const dir = path.join(this.app.config.baseDir, 'app/model')
        this.app.loader.loadToApp(dir, 'model', {
            caseStyle: 'upper'
        })
        // app/model/user.ts => app.model.User
    }
}
module.exports = AppBoot