import { getCollection } from "astro:content";

export async function getProjects() {
  const entries = (await getCollection("projects")).filter((project) => !project.data.draft);
  const realProjects = entries.filter((project) => !project.data.sample);
  // 发布第一个真实项目时自动隐藏全部样例，避免样例混进个人作品集。
  const visible = realProjects.length ? realProjects : entries;
  return visible.sort((a, b) =>
    Number(b.data.featured) - Number(a.data.featured) ||
    a.data.order - b.data.order ||
    b.data.date.localeCompare(a.data.date) || a.id.localeCompare(b.id)
  );
}

export function withBase(path: string) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export function projectUrl(id: string) {
  return withBase(`projects/${id.split("/").map(encodeURIComponent).join("/")}/`);
}
