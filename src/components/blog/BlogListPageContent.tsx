"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useI18n } from "@/lib/i18n";
import type { BlogPost } from "@/types/database";
import { AdBanner } from "@/components/site/Ads";
import { BlogCard } from "@/components/site/BlogCard";
import { Button } from "@/components/ui/button";

interface BlogListPageContentProps {
  page: number;
  pages: number;
  posts: BlogPost[];
}

export function BlogListPageContent({ page, pages, posts }: BlogListPageContentProps) {
  const { t, locale } = useI18n();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {t("blog.title")}
      </h1>
      <AdBanner slot="blog-top" format="leaderboard" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Fragment key={p.slug}>
            <BlogCard post={p} />
            {i === 5 && (
              <div className="sm:col-span-2 lg:col-span-3">
                <AdBanner slot="blog-middle" format="leaderboard" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      {posts.length < 6 && <AdBanner slot="blog-middle" format="leaderboard" />}
      <div className="mt-8 flex justify-center gap-3">
        <Button
          variant="outline"
          disabled={page <= 1}
          asChild={page > 1}
        >
          {page > 1 ? (
            <Link href={`/${locale}/blog?page=${page - 1}`}>{t("common.prev")}</Link>
          ) : (
            <span>{t("common.prev")}</span>
          )}
        </Button>
        <Button
          variant="outline"
          disabled={page >= pages}
          asChild={page < pages}
        >
          {page < pages ? (
            <Link href={`/${locale}/blog?page=${page + 1}`}>{t("common.next")}</Link>
          ) : (
            <span>{t("common.next")}</span>
          )}
        </Button>
      </div>
    </div>
  );
}
