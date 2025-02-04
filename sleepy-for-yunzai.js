// 假设已安装axios，用于发起HTTP请求
import axios from 'axios';

// 无需导入plugin和segment，示例中已说明它们是全局变量

// 定义插件类，注意类名按照需求修改为与插件名相关
export class SleepyForYunzai extends plugin {
    constructor() {
        super({
            name:'sleepy-for-yunzai', // 插件名称
            dsc: '“sleepy 的 yunzai 客户端”', // 插件描述
            event:'message', // 监听消息事件
            priority: 6, // 插件优先度，数字越小优先度越高
            rule: [
                {
                    reg: '^人呢$', // 正则表达式，匹配消息“人呢”
                    fnc: 'handleQuery' // 执行方法
                }
            ]
        });
    }

    // 处理请求数据并回复的方法
    async handleQuery(e) {
        try {
            const response = await axios.get('http://39.104.207.243:9010/query');
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

            // 直接回复格式化后的文本数据
            e.reply(replyMessage.trim());
        } catch (error) {
            console.error('请求数据出错:', error);
            // 可以在这里回复错误信息给用户
            e.reply('获取数据时出现错误，请稍后重试！');
        }
    }
}