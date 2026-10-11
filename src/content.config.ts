import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const webLink = z.string().url().refine((url) => /^https?:\/\//i.test(url), "链接必须使用 https:// 或 http://");
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "日期格式：2026-10-11"),
    tags: z.array(z.string()).default([]),
    cover: z.string().startsWith("/").default("/images/project-placeholder.svg"),
    coverAlt: z.string().default("项目封面"),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    status: z.enum(["已上线", "开发中", "已归档"]).default("已上线"),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
    role: z.string().optional(),
    demoUrl: webLink.optional(),
    repoUrl: webLink.optional(),
  }),
});

export const collections = { projects };
