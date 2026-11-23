import { ContactFormContent } from "@/components/contact/ContactFormContent";

export const metadata = {
  title: "Contact TryVisaInfo",
  description:
    "Questions, corrections or partnerships — get in touch with the TryVisaInfo team.",
  openGraph: {
    title: "Contact TryVisaInfo",
    description: "Get in touch with the TryVisaInfo team.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Contact() {
  return <ContactFormContent />;
}
