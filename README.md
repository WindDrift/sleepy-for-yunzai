# sleepy-for-yunzai
让 [Yunzai-Bot](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index) 从 [sleepy](https://github.com/wyf9/sleepy) 服务端获取设备状态并发送消息。
# 效果预览
![效果预览](https://gitee.com/WindDrift/sleepy-for-yunzai/raw/master/preview.png)
# 使用方法
## 安装依赖
需要 `axios` 依赖，请在 Yunzai-Bot 根目录使用以下命令安装：
```
pnpm i
pnpm add axios -w
```
## 安装
1. 从仓库下载 [`sleepy-for-yunzai.js`](https://github.com/WindDrift/sleepy-for-yunzai/blob/master/sleepy-for-yunzai.js) 文件；
2. 将下载的文件放入 Yunzai-Bot 的 `plugins`-`example` 文件夹中；
> 如果你正在使用来自 [bling-yshs/HYZL](https://github.com/bling-yshs/HYZL) 的 Yunzai-Bot Windows 启动器，可在 `云崽管理` - `安装js插件` 中输入 js Raw 文件链接：
> `https://raw.githubusercontent.com/WindDrift/sleepy-for-yunzai/refs/heads/master/sleepy-for-yunzai.js`
> 你亦可以使用其他支持使用 Raw 文件链接下载 js 插件的插件。
3. 打开该文件；
4. 按照注释修改第 11、18 至 23 行代码，然后保存；
5. 重启 Yunzai-Bot 。
## 使用
发送 `人呢`、`在干嘛` 查看所有设备状态。

若需要修改关键词，请修改 `sleepy-for-yunzai.js` 文件第 11、23 行的代码，然后重启 Yunzai-Bot。

其他 API 正着手适配中。
## 进阶
阅读 [sleepy API 文档](https://github.com/wyf9/sleepy/blob/main/doc/api.md)，加入更多功能。

欢迎各位大佬提交 [Issue](https://gitee.com/WindDrift/sleepy-for-yunzai/issues) 与 [Pull Request](https://gitee.com/WindDrift/sleepy-for-yunzai/pulls) 补充代码。
# 其他及鸣谢
本插件仅供学习交流使用，不得用于商业用途。

感谢 [Lain./Miao-Yunzai-plugin](https://gitee.com/shijinn/Miao-Yunzai-plugin) 与 [令狐冰璃/yunzai_Bot插件简单制作](https://gitee.com/Yae_Miko_Fox/yunzai_bot-plugin) 的基础教程。

本插件大量代码使用 [Microsoft Visual Studio](https://visualstudio.microsoft.com) with [Github Copilot AI](https://github.com/features/copilot) 与 [豆包](https://www.doubao.com/chat) 协助编写。~~我什么都不会（哭）~~

感谢 [wyf9/sleepy](https://github.com/wyf9/sleepy) 提供支持。
