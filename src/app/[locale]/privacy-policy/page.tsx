export const metadata = {
  title: "Privacy Policy | TryVisaInfo",
  description:
    "How TryVisaInfo uses cookies, analytics and Google AdSense, and how to opt out of personalized ads.",
  openGraph: {
    title: "Privacy Policy | TryVisaInfo",
    description: "Cookies, analytics and advertising on TryVisaInfo.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 leading-relaxed">
      <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: November 4, 2026</p>
      <h2 className="text-2xl font-bold">Information we collect</h2>
      <p>
        We don't require accounts. We collect anonymous usage data (pages viewed, device type,
        approximate location) through cookies and analytics tools to improve the site. Your theme
        and language choices are stored in your browser.
      </p>
      <h2 className="text-2xl font-bold">Google AdSense and third-party ads</h2>
      <p>
        We use Google AdSense to show ads. Third-party vendors, including Google, use cookies to
        serve ads based on your previous visits to this and other websites. Google's use of
        advertising cookies enables it and its partners to serve ads based on your visits.
      </p>
      <h2 className="text-2xl font-bold">Opting out of personalized ads</h2>
      <p>
        You can opt out of personalized advertising at{" "}
        <a
          className="text-primary underline"
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads Settings
        </a>{" "}
        or{" "}
        <a
          className="text-primary underline"
          href="https://www.aboutads.info/choices"
          target="_blank"
          rel="noopener noreferrer"
        >
          aboutads.info
        </a>
        .
      </p>
      <h2 className="text-2xl font-bold">Contact</h2>
      <p>Questions about this policy? Email hello@tryvisainfo.com.</p>
    </div>
  );
}
