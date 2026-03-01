/*
 * @Description: 轻创AI 对外 API 工具类（https://aihuman.xajuliang.com）
 * 提供：获取账号剩余算力、创建视频生成任务、查询生成任务
 */

const https = require("https");
const { URL } = require("url");

/**
 * 轻创AI 对外 API 客户端
 * 使用方式：
 * 1. 在 Service/Controller 中：const client = AiHuman.getClient(this.app); await client.getUserScore('nano_banana_pro');
 * 2. 直接实例化：const client = new AiHuman.AiHumanClient({ baseURL, token });
 */
class AiHumanClient {
  /**
   * @param {object} options
   * @param {string} [options.baseURL='https://aihuman.xajuliang.com'] - API 根地址
   * @param {string} [options.token=''] - Authorization 令牌
   */
  constructor(options = {}) {
    this.baseURL = (options.baseURL || "https://aihuman.xajuliang.com").replace(/\/$/, "");
    this.token = options.token || "";
  }

  /**
   * 发起 POST 请求
   * @param {string} path - 路径，如 /api/open/getUserScore
   * @param {object} body - 请求体
   * @returns {Promise<{ code: number, message: string, data?: any }>}
   */
  async _request(path, body) {
    const url = new URL(path, this.baseURL);
    const postData = JSON.stringify(body);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData, "utf8"),
        ...(this.token ? { Authorization: this.token } : {}),
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
          try {
            const json = data ? JSON.parse(data) : {};
            resolve(json);
          } catch (e) {
            reject(new Error(`响应解析失败: ${data}`));
          }
        });
      });
      req.on("error", reject);
      req.write(postData, "utf8");
      req.end();
    });
  }

  /**
   * 获取账号剩余算力
   * @param {string} type - 类型：sora2、veo3、grok_imagine、nano_banana_pro
   * @returns {Promise<{ score: number }>} 返回 data 内容，失败时抛出
   */
  async getUserScore(type) {
    const res = await this._request("/api/open/getUserScore", { type });
    if (res.code !== 200) {
      throw new Error(res.message || "getUserScore 失败");
    }
    return res.data;
  }

  /**
   * 创建视频生成任务
   * @param {object} params
   * @param {string} params.type - 类型：sora2、veo3、grok_imagine、nano_banana_pro
   * @param {string} params.prompt - 提示词
   * @param {string} [params.proportion] - 比例 9:16、16:9
   * @param {number} [params.duration] - 视频秒数（sora2:15/25, veo3:8, grok_imagine:10）
   * @param {string[]} [params.prompt_images] - 参考图（veo3 支持多张）
   * @param {string} [params.size] - 生成尺寸（veo3:720p/1080p/4K，nano_banana_pro:1K/2K/4K）
   * @param {string} params.model - sora2-pro / normal|frame / grok_imagine / nano_banana_pro
   * @returns {Promise<{ unique_id: string }>} 返回 data，含任务唯一ID
   */
  async submitProduce(params) {
    const res = await this._request("/api/open/submitProduce", params);
    if (res.code !== 200) {
      throw new Error(res.message || "submitProduce 失败");
    }
    return res.data;
  }

  /**
   * 查询生成任务
   * @param {string} uniqueId - 任务唯一ID
   * @returns {Promise<{ unique_id: string, status: number, output: string, fail_reason: string }>} 返回 data；status 1:等待中 2:生成中 3:成功 4:失败
   */
  async queryProduce(uniqueId) {
    const res = await this._request("/api/open/queryProduce", { unique_id: uniqueId });
    if (res.code !== 200) {
      throw new Error(res.message || "queryProduce 失败");
    }
    return res.data;
  }
}

/**
 * 从 Egg app 配置创建客户端（读取 config.aihuman）
 * @param {object} app - Egg 应用实例
 * @returns {AiHumanClient}
 */
function getClient(app) {
  const conf = app.config && app.config.aihuman ? app.config.aihuman : {};
  return new AiHumanClient({
    baseURL: conf.baseURL,
    token: conf.token,
  });
}

module.exports = {
  AiHumanClient,
  getClient,
};
