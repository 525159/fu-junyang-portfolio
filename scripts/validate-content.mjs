import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";

const root = process.cwd();
const directory = path.join(root, "src/content/projects");
const publicDirectory = path.join(root, "public");
const files = await fs.readdir(directory, { recursive: true });
let published = 0;
for (const file of files.filter((file) => file.endsWith(".md"))) {
  const text = await fs.readFile(path.join(directory, file), "utf8");
  const frontmatter = text.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) throw new Error(`${file}: 缺少文件开头的 --- 项目信息 ---。`);
  const data = parse(frontmatter[1]);
  if (!data || typeof data !== "object") throw new Error(`${file}: 项目信息格式不正确。`);
  if (data.draft) continue;
  const cover = data.cover || "/images/project-placeholder.svg";
  const coverFile = path.resolve(publicDirectory, `.${cover}`);
  if (!cover.startsWith("/") || !coverFile.startsWith(publicDirectory + path.sep)) throw new Error(`${file}: 封面必须指向 public 文件夹内的图片。`);
  try { const stat = await fs.stat(coverFile); if (!stat.isFile()) throw new Error("不是文件"); }
  catch { throw new Error(`${file}: 找不到封面 ${cover}，请把图片放进 public 对应目录。`); }
  const date = new Date(data.date);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== data.date) throw new Error(`${file}: 项目日期无效。请用引号包裹有效日期，如 "2026-10-11"。`);
  published++;
}
console.log(`内容检查通过：${published} 个已发布的项目文件，封面和日期有效。`);
