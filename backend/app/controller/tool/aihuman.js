/*
 * @Description: 轻创AI 对外 API 代理控制器（https://aihuman.xajuliang.com）
 * 暴露：获取账号剩余算力、创建视频生成任务、查询生成任务
 */

const Controller = require("egg").Controller;
const { Route, HttpPost } = require("egg-decorator-router");
const AiHuman = require("../../utils/aihuman");

module.exports = (app) => {
  @Route("/tool/aihuman")
  class AiHumanController extends Controller {
    /**
     * 获取账号剩余算力
     * POST /api/tool/aihuman/getUserScore
     * 请求体: { type: "sora2" | "veo3" | "grok_imagine" | "nano_banana_pro" }
     */
    @HttpPost("/getUserScore")
    async getUserScore() {
      const { ctx } = this;
      try {
        const { type } = ctx.request.body || {};
        if (!type) {
          ctx.body = { code: 500, msg: "参数 type 不能为空" };
          return;
        }
        const client = AiHuman.getClient(this.app);
        const data = await client.getUserScore(type);
        ctx.body = { code: 200, msg: "success", data };
      } catch (err) {
        ctx.logger.error("aihuman getUserScore 失败:", err);
        ctx.body = { code: 500, msg: err.message || "获取算力失败" };
      }
    }

    /**
     * 创建视频生成任务
     * POST /api/tool/aihuman/submitProduce
     * 请求体: { type, prompt, proportion?, duration?, prompt_images?, size?, model }
     */
    @HttpPost("/submitProduce")
    async submitProduce() {
      const { ctx } = this;
      try {
        const body = ctx.request.body || {};
        if (!body.type || !body.prompt || !body.model) {
          ctx.body = { code: 500, msg: "参数 type、prompt、model 不能为空" };
          return;
        }
        const client = AiHuman.getClient(this.app);
        const data = await client.submitProduce(body);
        ctx.body = { code: 200, msg: "success", data };
      } catch (err) {
        ctx.logger.error("aihuman submitProduce 失败:", err);
        ctx.body = { code: 500, msg: err.message || "创建任务失败" };
      }
    }

    /**
     * 创建 Sora2 视频生成任务（type、size、model 固定，仅接收 prompt、proportion、duration、prompt_images）
     * POST /tool/aihuman/submitSoraProduce
     * 请求体: { prompt, proportion?, duration?, prompt_images? }
     */
    @HttpPost("/submitSoraProduce")
    async submitSoraProduce() {
      const { ctx } = this;
      try {
        const body = ctx.request.body || {};
        if (!body.prompt) {
          ctx.body = { code: 500, msg: "参数 prompt 不能为空" };
          return;
        }
        const params = {
          type: "sora2",
          size: "1080p",
          model: "sora2-pro",
          prompt: body.prompt,
          proportion: body.proportion || "9:16",
          duration: body.duration != null ? Number(body.duration) : 15,
          prompt_images: Array.isArray(body.prompt_images) ? body.prompt_images : (body.prompt_images ? [body.prompt_images] : [""]),
        };
        const client = AiHuman.getClient(this.app);
        const data = await client.submitProduce(params);
        ctx.body = { code: 200, msg: "success", data };
      } catch (err) {
        ctx.logger.error("aihuman submitSoraProduce 失败:", err);
        ctx.body = { code: 500, msg: err.message || "创建任务失败" };
      }
    }

    /**
     * 查询生成任务
     * POST /api/tool/aihuman/queryProduce
     * 请求体: { unique_id: string }
     */
    @HttpPost("/queryProduce")
    async queryProduce() {
      const { ctx } = this;
      try {
        const { unique_id: uniqueId } = ctx.request.body || {};
        if (!uniqueId) {
          ctx.body = { code: 500, msg: "参数 unique_id 不能为空" };
          return;
        }
        const client = AiHuman.getClient(this.app);
        const data = await client.queryProduce(uniqueId);
        ctx.body = { code: 200, msg: "success", data };
      } catch (err) {
        ctx.logger.error("aihuman queryProduce 失败:", err);
        ctx.body = { code: 500, msg: err.message || "查询任务失败" };
      }
    }
  }

  return AiHumanController;
};
