import axios from "axios";

const baseURL = "http://localhost:7001";
const api = axios.create({
  baseURL,
  timeout: 10000,
});

export { baseURL as apiBaseURL };

const TOKEN_KEY = "auth_token";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** 登录（不传 code/uuid，后端验证码已关闭时使用） */
export async function login(username: string, password: string) {
  const { data } = await api.post<{ code: number; msg: string; token?: string }>(
    "/login",
    { username, password }
  );
  if (data.code !== 200) {
    throw new Error(data.msg || "登录失败");
  }
  return { token: data.token!, msg: data.msg };
}

/** 图片上传接口返回 */
export interface UploadImageResult {
  url: string;
  newFileName: string;
  originalFilename: string;
}

/** 上传图片（调用 POST /api/common/upload/image） */
export async function uploadImage(file: File): Promise<UploadImageResult> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<{
    code: number;
    msg: string;
    url?: string;
    newFileName?: string;
    originalFilename?: string;
  }>("/common/upload/image", formData);
  if (data.code !== 200 || !data.url) {
    throw new Error(data.msg || "图片上传失败");
  }
  return {
    url: data.url,
    newFileName: data.newFileName ?? "",
    originalFilename: data.originalFilename ?? file.name,
  };
}

export default api;
