import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/data";
import { hydrateBlogPost } from "@/lib/hydrate";
import { isLocale } from "@/lib/messages";
import { BlogListPageContent } from "@/components/blog/BlogListPageContent";

export const metadata = {
  title: "Visa Guides & Travel Tips | TryVisaInfo Blog",
  description:
    "Expert visa guides, tips and travel information for travelers from Africa, Asia, Latin America and beyond.",
  openGraph: {
    title: "Visa Guides & Travel Tips | TryVisaInfo Blog",
    description:
      "Expert visa guides, tips and travel information for travelers worldwide.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function BlogList({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const posts = await getBlogPosts(locale);
  const pages = Math.max(1, Math.ceil(posts.length / 10));
  const paginated = posts
    .slice((page - 1) * 10, page * 10)
    .map((p) => hydrateBlogPost(p, locale));
  return <BlogListPageContent page={page} pages={pages} posts={paginated} />;
}

