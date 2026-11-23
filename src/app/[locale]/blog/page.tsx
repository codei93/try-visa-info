import { getBlogPosts, getOrigins, getDestinations, hydrateBlogPost } from "@/lib/data";
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
  searchParams: { page?: string };
}) {
  const locale = (await params).locale;
  const page = parseInt(searchParams.page ?? "1", 10) || 1;
  const posts = await getBlogPosts(locale as any);
  const pages = Math.max(1, Math.ceil(posts.length / 10));
  const paginated = posts
    .slice((page - 1) * 10, page * 10)
    .map((p) => hydrateBlogPost(p, locale as any));
  return <BlogListPageContent page={page} pages={pages} posts={paginated} />;
}

