import { notFound } from "next/navigation";
import {
  getPost,
  getBlogPosts,
  getOrigins,
  getDestinations,
  hydrateBlogPost,
} from "@/lib/data";
import { BlogPostPageContent } from "@/components/blog/BlogPostPageContent";

export interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale as any);
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
  const post = await getPost(slug, locale as any);
  if (!post) {
    notFound();
  }
  const [origins, destinations] = await Promise.all([
    getOrigins(),
    getDestinations(),
  ]);
  const countries = [...origins, ...destinations];
  const allPosts = await getBlogPosts(locale as any);
  const related = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map((p) => hydrateBlogPost(p, locale as any, countries));
  return (
    <BlogPostPageContent
      post={hydrateBlogPost(post, locale as any, countries)}
      related={related}
    />
  );
}
