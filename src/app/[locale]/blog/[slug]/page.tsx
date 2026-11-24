import { notFound } from "next/navigation";
import {
  getPost,
  getBlogPosts,
  getOrigins,
  getDestinations,
} from "@/lib/data";
import { hydrateBlogPost } from "@/lib/hydrate";
import { isLocale } from "@/lib/messages";
import { BlogPostPageContent } from "@/components/blog/BlogPostPageContent";

export interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPost(slug, locale);
  if (!post) {
    return {
      title: "Article unavailable | TryVisaInfo",
      robots: "noindex",
    };
  }
  return {
    title: `${post.title} | TryVisaInfo`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function PostPage({
  params,
}: BlogPostPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = await getPost(slug, locale);
  if (!post) {
    notFound();
  }
  const [origins, destinations] = await Promise.all([
    getOrigins(),
    getDestinations(),
  ]);
  const countries = [...origins, ...destinations];
  const allPosts = await getBlogPosts(locale);
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map((p) => hydrateBlogPost(p, locale, countries));
  return (
    <BlogPostPageContent
      post={hydrateBlogPost(post, locale, countries)}
      related={related}
    />
  );
}
