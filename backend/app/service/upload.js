/*
 * @Description: 文件上传服务层
 * @Author: AI Assistant
 * @Date: 2025-10-24
 */
const Service = require("egg").Service;
const streamWormhole = require("stream-wormhole");
const path = require("path");
const fs = require("fs-extra");

class UploadService extends Service {
  
  /**
   * 文件上传（流式）
   * @return {object} 上传结果
   */
  async stream() {
    const { app, ctx } = this;

    const stream = await ctx.getFileStream();
    try {
      const filename = this.generateFilename(stream.filename);
      const filePath = path.join(app.config.uploadAbsPath, filename);
      
      await this.saveAsFile(stream, filePath);
      
      return {
        filename: stream.filename,
        mimeType: stream.mimeType,
        url: path.join(app.config.uploadRelPath, filename).replace(/\\/g, '/'),
        newFileName: filename
      };
    } catch (error) {
      await streamWormhole(stream);
      throw error;
    }
  }

  /**
   * 图片上传（流式），保存到 uploads/images/ 子目录，仅允许图片后缀
   * @return {object} 上传结果
   */
  async streamImage() {
    const { app, ctx } = this;

    const stream = await ctx.getFileStream();
    const ext = path.extname(stream.filename).toLowerCase();
    const imageExts = [ ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".wbmp", ".webp" ];
    if (!imageExts.includes(ext)) {
      await streamWormhole(stream);
      throw new Error(`仅支持图片格式：${imageExts.join("、")}`);
    }

    try {
      const filename = this.generateFilename(stream.filename);
      const imageDir = path.join(app.config.uploadAbsPath, "images");
      await fs.ensureDir(imageDir);
      const filePath = path.join(imageDir, filename);

      await this.saveAsFile(stream, filePath);

      const relPath = path.join(app.config.uploadRelPath, "images", filename).replace(/\\/g, "/");
      return {
        filename: stream.filename,
        mimeType: stream.mimeType,
        url: relPath,
        newFileName: `images/${filename}`,
      };
    } catch (error) {
      await streamWormhole(stream);
      throw error;
    }
  }

  /**
   * 生成唯一文件名
   * @param {string} originalFilename - 原始文件名
   * @return {string} 生成的文件名
   */
  generateFilename(originalFilename) {
    const { ctx } = this;
    
    // 生成格式：时间戳_UUID.扩展名
    const timestamp = Date.now();
    const ext = path.extname(originalFilename);
    const uuid = Math.random().toString(36).substring(2, 15);
    
    return `${timestamp}_${uuid}${ext}`;
  }

  /**
   * 保存文件
   * @param {Stream} stream - 文件流
   * @param {string} filePath - 保存路径
   */
  saveAsFile(stream, filePath) {
    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(filePath);
      stream
        .pipe(writer)
        .on("error", (error) => {
          writer.destroy();
          stream.destroy();
          reject(error);
        })
        .on("finish", () => {
          writer.destroy();
          stream.destroy();
          resolve();
        });
    });
  }

  /**
   * 检查文件是否允许下载
   * @param {string} filename - 文件名
   * @return {boolean} 是否允许
   */
  checkAllowDownload(filename) {
    // 检查文件名是否包含非法字符
    const illegalChars = ['..', '\\', '//'];
    
    for (const char of illegalChars) {
      if (filename.includes(char)) {
        return false;
      }
    }
    
    return true;
  }
}

module.exports = UploadService;
