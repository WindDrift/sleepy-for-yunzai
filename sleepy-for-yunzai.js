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
    queryMessage = ['人呢', '在干嘛', '浮笙在干嘛']; // 从 /query API 获取所有设备状态的消息关键词
    
    // 处理请求数据并回复的方法
    async handleQuery(e) {
        // 添加消息判断
        if (!validMessages.includes(this.queryMessage)) {
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
                    replyMessage += `${device.show_name}:\n${device.using ? device.app_name : '未在使用'}\n\n`;
                }
            }

            // 添加最后更新时间
            replyMessage += `最后更新时间:\n${data.last_updated}`;

            // 回复格式化后的文本数据
            e.reply(replyMessage.trim());
        } catch (error) {
            console.error('请求数据出错:', error);
            // 若获取失败则回复错误信息给用户
            e.reply('获取数据时出现错误，请稍后重试！');
        }
    }
}