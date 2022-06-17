
// 类型文件
// 为了适配 ts开发，都要提供单独的 ts定义文件；也就是每个插件都有提供 index.d.ts 文件

import "egg"
import { Connection, Model } from 'mongoose'

declare module 'egg' {
    type MongooseModels = {
        [key: string]: Model<any>
    }
    // 以下两种类型会重载加到 egg这个类型中
    interface Application {
        mongoose: Connection;
        model: MongooseModels;
    }
    interface EggAppConfig {
        mongoose: {
            url?: string
        }
    }
}