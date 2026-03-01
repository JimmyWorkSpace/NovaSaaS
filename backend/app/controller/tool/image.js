/*
 * @Description: 图片工具类（九宫格等），不暴露接口，仅供内部调用
 */

const sharp = require("sharp");
const fs = require("fs").promises;

/**
 * 从 URL 或本地路径加载图片为 Buffer
 * @param {string} src - 图片地址（http(s) URL 或本地绝对/相对路径）
 * @returns {Promise<Buffer>}
 */
async function loadImageBuffer(src) {
  const trimmed = (src || "").trim();
  if (!trimmed) {
    return null;
  }
  if (/^https?:\/\//i.test(trimmed)) {
    const res = await fetch(trimmed, { redirect: "follow" });
    if (!res.ok) {
      throw new Error(`请求图片失败: ${trimmed}, status ${res.status}`);
    }
    const ab = await res.arrayBuffer();
    return Buffer.from(ab);
  }
  const buf = await fs.readFile(trimmed);
  return buf;
}

/**
 * 将多张图片合成为九宫格图（3x3）
 * @param {string[]} imageUrls - 图片地址数组（1～9 个），支持 http(s) URL 或本地路径，不足 9 张时空白格用背景色填充
 * @param {object} [options] - 可选配置
 * @param {number} [options.cellSize=300] - 每个格子的边长（像素）
 * @param {number} [options.gap=4] - 格子之间的间隙（像素）
 * @param {string} [options.format='png'] - 输出格式：'png' | 'jpeg'
 * @param {string} [options.backgroundColor='#ffffff'] - 空白格或背景色（仅 format 为 jpeg 时对空白格有效，png 可用透明）
 * @returns {Promise<Buffer>} 合成后的图片 Buffer
 */
async function createNineGrid(imageUrls, options = {}) {
  const {
    cellSize = 300,
    gap = 4,
    format = "png",
    backgroundColor = "#ffffff",
  } = options;

  const list = Array.isArray(imageUrls) ? imageUrls.slice(0, 9) : [];
  const needCount = 9;
  const rows = 3;
  const cols = 3;

  // 加载并缩放到 cellSize x cellSize（cover 裁剪填充）
  const loadOne = async (url) => {
    if (!url) return null;
    try {
      const buf = await loadImageBuffer(url);
      if (!buf || buf.length === 0) return null;
      return sharp(buf)
        .resize(cellSize, cellSize, { fit: "cover", position: "center" })
        .toBuffer();
    } catch (e) {
      return null;
    }
  };

  const cellBuffers = await Promise.all(
    list.map((url) => loadOne(url))
  );

  // 补足 9 格：空白格用纯色图
  const emptyCell = await sharp({
    create: {
      width: cellSize,
      height: cellSize,
      channels: format === "jpeg" ? 3 : 4,
      background: format === "jpeg" ? backgroundColor : { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    [format === "jpeg" ? "jpeg" : "png"]()
    .toBuffer();

  const cells = [];
  for (let i = 0; i < needCount; i++) {
    cells.push(cellBuffers[i] || emptyCell);
  }

  // 合成：按行拼接再纵向拼接
  const withGap = (n, g) => n * 3 + g * 2;
  const totalW = withGap(cellSize, gap);
  const totalH = withGap(cellSize, gap);

  const compositeList = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col;
      compositeList.push({
        input: cells[idx],
        left: col * (cellSize + gap),
        top: row * (cellSize + gap),
      });
    }
  }

  const base = sharp({
    create: {
      width: totalW,
      height: totalH,
      channels: format === "jpeg" ? 3 : 4,
      background: format === "jpeg" ? backgroundColor : { r: 255, g: 255, b: 255, alpha: 0 },
    },
  });

  const out = await base
    .composite(compositeList)
    [format === "jpeg" ? "jpeg" : "png"]({ quality: format === "jpeg" ? 90 : undefined })
    .toBuffer();

  return out;
}

module.exports = {
  createNineGrid,
  loadImageBuffer,
};
