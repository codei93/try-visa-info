import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/database";
import { useI18n } from "@/lib/i18n";

export function BlogCard({ post }: { post: BlogPost }) {
  const { t } = useI18n();
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-0.5"
    >
      <img
        src={post.cover}
        alt={post.title}
        loading="lazy"
        width={1280}
        height={720}
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-semibold leading-snug group-hover:text-primary">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>
            {post.date} · {post.readTime} {t("blog.min")}
          </span>
          <span className="flex items-center gap-1 font-medium text-primary">
            {t("blog.read")} <ArrowRight className="size-3 rtl:rotate-180" />
          </span>
        </div>
      </div>
    </Link>
  );
}
