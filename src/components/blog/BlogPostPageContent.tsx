"use client";

import { Fragment } from "react";
import type { BlogPost } from "@/types/database";
import { useI18n } from "@/lib/i18n";
import { AdBanner } from "@/components/site/Ads";
import { BlogCard } from "@/components/site/BlogCard";
import { Breadcrumbs, Disclaimer } from "@/components/site/Layout";

interface BlogPostPageContentProps {
  post: BlogPost;
  related: BlogPost[];
}

export function BlogPostPageContent({ post, related }: BlogPostPageContentProps) {
  const { t, locale } = useI18n();
  let paragraphs = 0;
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs
        items={[
          { label: t("nav.home"), to: `/${locale}` },
          { label: t("nav.blog"), to: `/${locale}/blog` },
          { label: post.title },
        ]}
      />
      <img
        src={post.cover}
        alt={post.title}
        width={1280}
        height={720}
        className="aspect-video w-full rounded-xl object-cover"
      />
      <div className="mt-6 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="grid size-9 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
          {post.author[0]}
        </span>
        <span className="font-medium text-foreground">{post.author}</span> · {post.date} ·{" "}
        {post.readTime} {t("blog.min")}
      </div>
      <AdBanner slot="blogpost-top" format="leaderboard" />
      <div className="space-y-4 text-base leading-relaxed">
        {post.content.map((block, i) => {
          if (block.startsWith("## "))
            return (
              <h2 key={i} className="pt-4 text-2xl font-bold">
                {block.slice(3)}
              </h2>
            );
          paragraphs++;
          return (
            <Fragment key={i}>
              <p>{block}</p>
              {paragraphs === 3 && <AdBanner slot="blogpost-mid" format="leaderboard" />}
            </Fragment>
          );
        })}
      </div>
      <div className="mt-8">
        <Disclaimer>{t("footer.disclaimer")}</Disclaimer>
      </div>
      <AdBanner slot="blogpost-bottom" format="leaderboard" />
      <h2 className="mb-4 mt-10 text-2xl font-bold">{t("blog.related")}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {related.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </article>
  );
}
