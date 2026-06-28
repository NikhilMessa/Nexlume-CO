import { Helmet } from "react-helmet-async";

const SITE_URL = "https://nexlume-dev.netlify.app";

function SEO({
  title,
  description,
  canonical = "/",
  keywords = "",
  image = "/NX.png",
  schema = null,
}) {
  const pageUrl = `${SITE_URL}${canonical}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nexlume",
    url: SITE_URL,
    logo: `${SITE_URL}/NX.png`,
    image: imageUrl,
    description,
    areaServed: "Worldwide",
    serviceType: [
      "Website Design",
      "Web Development",
      "Mobile App Development",
      "UI/UX Design",
      "SEO Optimization",
      "Branding",
      "Software Development",
    ],
    email: "nexlume.co@gmail.com",
  };

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Nexlume" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}

export default SEO;