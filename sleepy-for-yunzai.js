import axios from 'axios';
export class SleepyForYunzai extends plugin {
    constructor() {
        super({
            name:'sleepy-for-yunzai', // 插件名称
            dsc: '“sleepy 的 yunzai 客户端”', // 插件描述
            event:'message', // 监听消息事件
            priority: 6, // 插件优先度，数字越小优先度越高
            rule: [
                {
                    reg: '.*(人呢|在干嘛|浮笙在干嘛).*', // 正则表达式，匹配消息包含“人呢”、“在干嘛”、“浮笙在干嘛”，请用“|”分隔匹配内容。
                    fnc: 'handleQuery' // 执行方法
                }
            ]
        });
    }

    // sleepy 服务器配置参数
    serverAddress = 'http://yourserver.com:9010'; // 替换为你的服务器地址，不要以“/”结尾，端口号根据实际情况修改
    apiKey = 'your-api-key'; // 替换为你的API密钥

    // 判断消息类型
    queryMessage = ['人呢', '在干嘛', '浮笙在干嘛']; // 消息关键词
    
    // 处理请求数据并回复的方法
    async handleQuery(e) {
        // 添加消息判断
        if (!this.queryMessage.includes(e.msg)) { // 检查消息是否在 queryMessage 中
            return;
        }

        try {
            const response = await axios.get(`${this.serverAddress}/query`); // 使用 GET 方法从 /query API 获取数据
            const data = response.data;
            const deviceData = data.device;
            let replyMessage = '';

            for (const deviceId in deviceData) {
                if (deviceData.hasOwnProperty(deviceId)) {
                    const device = deviceData[deviceId];
                    // 设备名称使用中文冒号
                    replyMessage += `${device.show_name}：\n`;
                    
                    if (device.using) {
                        // 获取原始数据字符串用于正则匹配
                        const rawData = device.raw_string || device.app_name;
                        
                        // 提取音乐信息 - 匹配 [♪歌曲名]
                        const musicMatch = rawData.match(/\[♪([^\]]+)\]/);
                        
                        // 提取电量信息
                        let batteryInfo = '';
                        const batteryCharging = rawData.match(/\[(\d{1,3})%\s?\+\]|\[🔋(\d{1,3})%⚡\]/);
                        const batteryFull = rawData.match(/\[(\d{1,3})%\]/);
                        
                        if (batteryCharging) {
                            const percentage = batteryCharging[1] || batteryCharging[2];
                            batteryInfo = `电量：${percentage}%，正在充电\n`;
                        } else if (batteryFull) {
                            const percentage = batteryFull[1];
                            batteryInfo = `电量：${percentage}%\n`;
                        }
                        
                        // 获取完整的应用信息（去掉标记符号）
                        const appInfo = rawData.replace(/\[♪[^\]]+\]\s*/, '').replace(/\[\d{1,3}%\s?[+⚡]*\]\s*/, '').replace(/\[🔋[^\]]+\]\s*/, '').trim();
                        replyMessage += `${appInfo}\n`;
                        
                        // 添加音乐信息
                        if (musicMatch) {
                            replyMessage += `正在播放：《${musicMatch[1]}》\n`;
                        }
                        
                        // 添加电量信息
                        if (batteryInfo) {
                            replyMessage += batteryInfo;
                        }
                    } else {
                        replyMessage += '未在使用\n';
                    }
                    
                    replyMessage += '\n';
                }
            }

            // 添加最后更新时间
            replyMessage += `最后更新时间：\n${data.last_updated}`;

            // 回复格式化后的文本数据
            e.reply(replyMessage.trim());
        } catch (error) {
            console.error('请求数据出错:', error);
            // 若获取失败则回复错误信息给用户
            e.reply('获取数据时出现错误，请稍后重试！');
        }
    }
}